import './App.css'
import { GoSearch } from 'react-icons/go';
import React, { useState } from 'react'
import api from '../../services/api';

const App = () => {

  const [input, setInput] = useState("");
  const [dados, setDados] = useState({});

  async function handleSearch (){

    if(input === ''){
      alert("Preencha um cep")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setDados(response.data);
      setInput("");
    } catch (error) {
      alert("Ops, erro ao buscar");
      setInput("");
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder='Digite um CEP...' 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className='buttonSearch' onClick={handleSearch}>
          <GoSearch size={25} color='#FFF'/>
        </button>
      </div>


      {Object.keys(dados).length > 0 && (
         <main className='main'>
            <h2>CEP: {dados.cep}</h2>

            <span>Rua: {dados.logradouro}</span>
            <span>Bairro: {dados.bairro}</span>
            <span>Cidade: {dados.localidade}</span>
            <span>Complemento: {dados.complemento} </span>
         </main>
      )}
    </div>
  )
}

export default App

