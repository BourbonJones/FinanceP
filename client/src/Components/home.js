import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { BsWallet, BsPiggyBank, BsFiletypeCsv, BsDatabaseAdd } from "react-icons/bs";
import "../Styles/home.css";

function Home() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [addManual, setaddManual] = useState('none');
    const [addCSV, setaddCSV] = useState('none');
    const [tamanho, setTamanho] = useState(75);
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/server/personId/' + id)
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, [id]);

    function ShowManual(e) {
        e.preventDefault();
        if (addManual === 'none') {
            setTamanho(tamanho + 25);
            setaddManual('flex');
        }
    }

    function hideManual(e) {
        e.preventDefault();
        setaddManual('none');
        setTamanho(tamanho - 25)
    }

    function ShowCSV(e) {
        e.preventDefault();
        if (addCSV === 'none') {
            setaddCSV('flex');
            setTamanho(tamanho + 25)
        }
    }

    function hideCSV(e) {
        e.preventDefault();
        setaddCSV('none');
        setTamanho(tamanho - 25)
    }

    function redirectToExtrato() {
        window.location.replace('../extrato/' + id)
    }

    function sendOneBill(e) {
        e.preventDefault();

        axios.post('http://localhost:8081/server/operation/' + id, {
            item: e.target.elements.namedItem('item').value,
            date: e.target.elements.namedItem('data').value,
            value: e.target.elements.namedItem('valor').value,
            category: e.target.elements.namedItem('categoria').value
        }).then(response => {
            console.log(response.data.message);
        }).catch(error => {
            alert(error);
        });

        setaddManual('none');
        setTamanho(tamanho - 25);
    }

    function exportar() {
        window.location.replace('../extrato/' + id + '?export=true');
    }

    function uploadCSV(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (event) {
            const content = String(event.target.result).split('\n');
            setFileContent(content);
        };
    }

    function enviarMultiplosDados(e) {
        e.preventDefault();
        fileContent.map(linha => {
            let lista = String(linha).split(';');

            axios.post('http://localhost:8081/server/operation/' + id, {
                item: lista[0],
                date: lista[1],
                value: lista[2],
                category: lista[3].replace("\r", "")
            }).then(response => {
                console.log(response.data.message);
            }).catch(error => {
                console.log(error);
            });
            return true;
        });
    }

    return (
        <div className='mid_body'>
            <div className='header'> Olá {data ? data.name : ''}! O que deseja hoje? </div>
            <div className='flex-column' style={{ minHeight: String(tamanho) + 'vh' }}>
                <div onClick={ShowManual} className='choose-block flex-row'>
                    <BsDatabaseAdd style={{ fontSize: '30px' }} />
                    <div style={{ width: '80%' }}>Adicionar transação manualmente</div>
                </div>
                <form onSubmit={sendOneBill} className='slide-down popup flex-column' style={{ display: addManual }}>
                    <div style={{ display: 'flex', justifyContent: 'end', width: '90%' }}><button onClick={hideManual}>Sair</button></div>
                    <input required name='item' placeholder='item'></input>
                    <input required name='data' placeholder='data'></input>
                    <input required name='valor' placeholder='valor'></input>
                    <input required name='categoria' placeholder='categoria'></input>
                    <div>se for gasto, coloque número negativo</div>
                    <button type='submit'>Enviar</button>
                </form>
                <div onClick={ShowCSV} className='choose-block flex-row'>
                    <BsFiletypeCsv style={{ fontSize: '30px' }} />
                    <div style={{ width: '80%' }}>Adicionar transações por CSV</div>
                </div>
                <form onSubmit={enviarMultiplosDados} className='slide-down popup flex-column' style={{ display: addCSV }}>
                    <div style={{ display: 'flex', justifyContent: 'end', width: '90%' }}><button onClick={hideCSV}>Sair</button></div>
                    <div>Insira seu arquivo CSV</div>
                    <input type='file' onChange={uploadCSV}></input>
                    <button type='submit'>Enviar</button>
                </form>
                <div onClick={redirectToExtrato} className='choose-block flex-row'>
                    <BsPiggyBank style={{ fontSize: '30px' }} />
                    <div style={{ width: '80%' }}>Ver meu extrato</div>
                </div>
                <div onClick={exportar} className='choose-block flex-row'>
                    <BsWallet style={{ fontSize: '30px' }} />
                    <div style={{ width: '80%' }}>Exportar Contas</div>
                </div>
            </div>
        </div>
    );
}

export default Home;