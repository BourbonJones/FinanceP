import React, { useState } from 'react';
import { BiUserCircle } from "react-icons/bi";
import axios from 'axios';
import "../Styles/login.css";

function Login() {
    const [nome, setNome] = useState();
    const [senha, setSenha] = useState();

    function RedirectToHome(e) {
        e.preventDefault();
        axios.get('http://localhost:8081/server/person/' + nome)
            .then(function (response) {

                if(response.data.length !== 0 && response.data[0].senha === senha){
                    window.location.replace('/home/' + response.data[0]._id);
                }
                else{
                    alert("Usuário inexistente ou senha incorreta")
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    function CreateUserAndGo(e) {
        e.preventDefault();

        if(nome && senha){
            axios.post('http://localhost:8081/server/person', {
                nome: nome,
                senha: senha
            })
            .then(response => {
                alert('Pessoa ' + nome + ' cadastrada com sucesso. Aperte em Login para entrar');
            })
            .catch(error => {
                alert(error);
            });
        }else{
            alert('Nome ou senha faltando');
        }
    }

    return (
        <div className='mid_body flex-column'>
            <form onSubmit={RedirectToHome} className='login-box'>
                <div><BiUserCircle style={{ height: '50px', width: '50px', color: "white", backgroundColor: 'lightgray' }} /></div>
                <div><input onChange={(e) => setNome(e.target.value)} type='text' placeholder='Nome'></input></div>
                <div><input onChange={(e) => setSenha(e.target.value)} type='text' placeholder='Senha'></input></div>
                <div className='flex-row' style={{ width: '90%' }}>
                    <div><button type='submit'>Login</button></div>
                    <div><button onClick={CreateUserAndGo}>Cadastrar</button></div>
                </div>
            </form>
            <div style={{color: 'red'}}>Se não tiver cadastro, digite um nome e uma senha e clique em Cadastrar.</div>
        </div>
    );
}

export default Login;