import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./Components/login";
import Home from "./Components/home";
import Extrato from "./Components/extrato";

function App() {
  function redirectToHome() {
    var page = window.location;
    window.location.replace(page.origin);
  }
  return (
    <Router>
      <nav>
        <div className="title" onClick={redirectToHome}>
          <span className='blue-letter'>F</span>
          <span className='red-letter'>i</span>
          <span className='yellow-letter'>n</span>
          <span className='blue-letter'>a</span>
          <span className='green-letter'>n</span>
          <span className='red-letter'>c</span>
          <span className='yellow-letter'>e</span>
          <span className='blue-letter'>P</span>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/extrato/:id" element={<Extrato />} />
      </Routes>
      <footer>Um projeto feito por: Pablo Delgado</footer>
    </Router>
  );
}

export default App;