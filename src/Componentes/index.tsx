import React, { useState } from 'react';
import './styles.css'
import ex from './ex.json'

interface Dados {
  id: number;
  tier: string;
  'Cpf Cnpj': number | string;
  proridade: string;
}

 

function Buscador() {
  const [numero, setNumero] = useState<string>('');
  const [dados, setDados] = useState<Dados | null>(null);
  const [erro, setErro] = useState<string | null>(null);
 
 

  const buscarDados = (numero: string): Dados | null => {
    const numeroInt = parseInt(numero, 10);
    if (isNaN(numeroInt)) {
      setErro('Digite um número válido.');
      return null;
    }

    const resultado = ex.Sheet1.find((item) => item.id === numeroInt);
    if (!resultado) {
      setErro('Nenhum resultado encontrado.')
    } else {
      setErro(null);
    }
    return resultado || null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoNumero = event.target.value;
    setNumero(novoNumero);
    setDados(buscarDados(novoNumero))
  };

  return (
    <div className="buscador-container">
      <label htmlFor="numeroInput">Digite um número:</label>
      <input type="number" id="numeroInput" value={numero} onChange={handleChange} />

      {erro && <p className="erro">{erro}</p>}

      {dados && (
        <div className="dados-container">
          <p>ID: {dados.id}</p>
          <p>Tier: {dados.tier}</p>
          <p>Prioridade: {dados.proridade}</p>
          <p>CPF/CNPJ: {dados['Cpf Cnpj']}</p>
        </div>
      )}
    </div>
  );
}

export default Buscador;