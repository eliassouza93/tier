import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log('%cDesenvolvido por Elias de souza', 'color: green; font-size: 10px;')
  }, [])



  const buscarDados = (numero: string): Dados | any => {
    const numeroInt = parseInt(numero, 10);
    if (isNaN(numeroInt)) {
      setErro('Digite um tenant válido.')
      return null;

    }

    const resultado = ex.Sheet1.find((item) => item.id === numeroInt);
    if (!resultado) {
      setErro('Nenhum resultado encontrado, Tenant novo ou portal cancelado')
    } else {
      setErro(null);
    }
    return resultado || null;
  };

  const pegaValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoNumero = event.target.value;
    setNumero(novoNumero);
    setDados(buscarDados(novoNumero))

  };

  return (
    <div className="buscador-container">
      <label htmlFor="numeroInput">Digite o Tenant:</label>
      <input placeholder='Digite o tenant' type="number" id="numeroInput" value={numero} onChange={pegaValor} />

      {erro && <p className="erro">{erro}</p>}

      {dados && (
        <div className="dados-container">
          <p>ID: {dados.id}</p>
          <p>Tier: {dados.tier}</p>
          <p>Revenda: {dados.proridade}</p>
          <p>CPF/CNPJ: {dados['Cpf Cnpj']}</p>
        </div>
      )}
    </div>
  );
}

export default Buscador;