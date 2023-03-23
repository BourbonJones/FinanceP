import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import "../Styles/home.css";
import "../Styles/extrato.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Extrato() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const pdfContent = useRef(null);
    const [inDate, setinDate] = useState();
    const [fiDate, setfiDate] = useState();

    useEffect(() => {
        axios.get('http://localhost:8081/server/operation/' + id)
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, [id]);

    useEffect(() => {
        const param = new URLSearchParams(window.location.search).get("export");

        if (param === 'true') {
            exportarPDF();
        }
    }, []);

    function deletar(e) {
        e.preventDefault();
        axios.delete('http://localhost:8081/server/operation/' + e.target.value)
            .then(window.location.reload())
            .catch(error => console.log(error));
    }

    function exportarPDF() {
        let elemento = pdfContent.current;
        html2canvas(elemento).then((canvas) => {
            const doc = new jsPDF();
            const imagem = canvas.toDataURL("image/png");
            doc.addImage(imagem, "PNG", 10, 10, 190, 200);
            doc.save("extrato_financep.pdf");
        });
    }

    if (inDate) {
        let [ano, mes, dia] = String(inDate).split('-');
        var inDateFiltro = new Date(ano, mes - 1, dia);
    }
    if (fiDate) {
        let [ano, mes, dia] = String(fiDate).split('-');
        var fiDateFiltro = new Date(ano, mes - 1, dia);
    }

    let dados = data?.message.filter((item) => {
        if (item.date) {
            let [dia, mes, ano] = String(item.date).split('/');
            var currentDate = new Date(ano, mes - 1, dia); 

            if(inDateFiltro && currentDate < inDateFiltro)
                return false;
            if(fiDateFiltro && currentDate > fiDateFiltro)
                return false;

            return true;
        }else{
            return true;
        }
        
    }).map((item) => {
        var valueColor = item.value > 0 ? 'green' : 'red';
        return (
            <tr style={{ backgroundColor: 'white', color: 'black' }} key={item._id}>
                <td>{item.item}</td>
                <td>{item.date}</td>
                <td style={{ color: valueColor }}>{item.value}</td>
                <td>{item.category}</td>
                <td className='deleteTd'><button value={item._id} onClick={deletar}>Deletar</button></td>
            </tr>
        )
    });
    return (
        <div className='mid_body' style={{ backgroundColor: 'gray' }} ref={pdfContent}>
            <div className='header' id='header'> Seu Extrato</div>
            <div className='flex-row' style={{ color: 'white', fontWeight: 'bold' }}>
                <div>Data Inicial: <input type='date' onChange={(e) => setinDate(e.target.value)} /></div>
                <div>Data Final: <input type='date' onChange={(e) => setfiDate(e.target.value)} /></div>
                <button onClick={e => window.location.replace('/home/' + id)}>Voltar</button>
            </div>
            <div className='flex-column'>
                <table>
                    <thead>
                        <tr id="thead">
                            <td className='td-top-left'>Item</td>
                            <td>Data</td>
                            <td>Valor</td>
                            <td className='td-top-right'>Categoria</td>
                            <td style={{ display: 'none' }}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {dados}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Extrato;