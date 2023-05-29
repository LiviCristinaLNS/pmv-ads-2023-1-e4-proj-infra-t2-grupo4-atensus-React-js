import { useState } from 'react';
import './DadosUsuario.css';
import LogoAtensus from '../../assets/logo atensus.png'
import MedicaCadastro from '../../assets/medicaCadastro.png';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DadosUsuario = ({ route }) => {

  var location = useLocation();
  const [Nome, setNome] = useState('');
  const [Idade, setIdade] = useState('');
 
  const cpf = location.state.cpf;
  const senha = location.state.senha;

  const [formData, setFormData] = useState({

    Nome: '',
    Idade: '',
    Altura: '',
    Peso: '',
    Endereco: '',
    CPF: '',
    Senha: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event)
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = () => {
    
    fetch(`https://localhost:7160/api/Pacientes/login/${cpf}/${senha}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {

      document.getElementById("Nome").value = data.nome;
      document.getElementById("Idade").value = data.idade;
      document.getElementById("Altura").value = data.altura;
      document.getElementById("Peso").value = data.peso;
      document.getElementById("Endereco").value = data.endereco;
      document.getElementById("CPF").value = data.cpf;
      document.getElementById("Senha").value = data.senha;
      document.getElementById("Sintomas").value = data.sintomas;
    })

    .catch(error => {
      console.error('Erro na requisição GET:', error);
    });
  };

  const Atualizar = () => {
    formData.Nome =    document.getElementById("Nome").value  
    formData.Idade =    document.getElementById("Idade").value  
    formData.Altura =    document.getElementById("Altura").value  
    formData.Peso =    document.getElementById("Peso").value  
    formData.Endereco =    document.getElementById("Endereco").value  
    formData.CPF =    document.getElementById("CPF").value  
    formData.Senha =    document.getElementById("Senha").value
    formData.Sintomas= document.getElementById("Sintomas").value

    axios.put('https://localhost:7160/api/Pacientes/atualizar', formData)
    .then(response => {
      console.log( 'Deu certo');
    })
    .catch(error => {
      console.log(error);
    });
  }
   
  return (
    
    <div className="Container-Cadastro">
      <header className='Header-Cadastro'>
        <img src={LogoAtensus} className='Logo'></img>
      </header>
      <img src={MedicaCadastro} alt='Médica' className="Imagem_Principal3" />
      
      <form  onClick={handleSubmit()}>
        <div className='Input-Cadastro'>
          <label htmlFor="Nome">Nome Completo</label>
          <input
            type="text"
            name="Nome"
            id="Nome"
            value={Nome}
            placeholder="Nome Completo"
            onChange={handleInputChange}
          />
        </div>
        <div className='Input-Cadastro'>
          <label htmlFor="Idade">Idade</label>
          <input
            type="text"
            name="Idade"
            id="Idade"
            value={Idade}
            placeholder="Idade"
            onChange={handleInputChange}
          />
        </div>
        <div className='Input-Cadastro'>
          <label htmlFor="Altura">Altura</label>
          <input
            type="text"
            name="Altura"
            id="Altura"
            placeholder="Altura"
            onChange={handleInputChange}
          />
        </div>
        <div className='Input-Cadastro'>
          <label htmlFor="Peso">Peso</label>
          <input
            type="text"
            name="Peso"
            id="Peso"
            placeholder="Peso"
            onChange={handleInputChange}
          />
        </div>
        <div className='Input-Cadastro'>
          <label htmlFor="Endereco">Endereço Completo</label>
          <input
            type="text"
            name="Endereco"
            id="Endereco"
            placeholder="Rua, Nº, Bairro, Cidade/Estado"
            onChange={handleInputChange}
          />
        </div>

        <div className='Input-Cadastro'>
          <label htmlFor="CPF">CPF</label>
          <input
            type="text"
            name="CPF"
            id="CPF"
            placeholder="CPF"
            onChange={handleInputChange}
            /> 
        </div>
        <div className='Input-Cadastro'>
          <label htmlFor="Senha">Senha</label>
          <input
            type="text"
            name="Senha"
            id="Senha"
            placeholder="Senha"
            onChange={handleInputChange}
            /> 
        </div>
        
        <div className='Input-Cadastro'>
          <label htmlFor="Sintomas">Sintomas</label>
          <input
            type="text"
            name="Sintomas"
            id="Sintomas"
            placeholder="Sintomas"
            onChange={handleInputChange}
          />
        </div>

      </form>


       <button className="Button" onClick={() =>  Atualizar()}>Atualizar dados</button>
      

      <div className="Bolinha" />
      <div className="Bolinha1" />
      <div className="Bolinha2" />
      <div className="Bolinha3" />
      <div className="Bolinha4" />
    </div>
  );
};

export default DadosUsuario;
