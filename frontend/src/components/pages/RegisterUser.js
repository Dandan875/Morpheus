import React, { Component } from 'react';
import axios from 'axios';

import '../stylePages/RegisterUser.css';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {

    const novoUsuario = {
      nome: this.state.nome,
      cpf: this.state.cpf,
      telefone: this.state.telefone,
      email: this.state.email,
    };

    axios.post('http://127.0.0.1:5000/add_usuario', novoUsuario)
      .then((response) => {
        console.log('Usuário cadastrado com sucesso:', response.data);
        window.location.replace("/ListUser");
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error);
      });
    
  }

  render() {
    return (
      <div className="formulario-container">
        <form onSubmit={this.handleSubmit} className="formulario">
          <div className="input-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={this.state.nome}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={this.state.cpf}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Telefone:</label>
            <input
              type="text"
              name="telefone"
              value={this.state.telefone}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Salvar</button>
            <button><a href='/'>Cancelar</a></button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterUser;
