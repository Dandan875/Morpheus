import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../stylePages/RegisterUser.css';

function EditUsers() {
  const { id } = useParams();
  const userId = parseInt(id, 10);
  const [user, setUser] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/edit_usuario/${userId}`)
      .then((response) => {
        const { data } = response;

        if (data && data.length >= 5) {
          setUser({
            nome: data[1],
            cpf: data[2],
            telefone: data[3],
            email: data[4],
          });
        } else {
          console.error('Dados do usuário incompletos ou em formato inesperado.');
        }
    })
      .catch((error) => {
        console.error('Erro ao buscar dados do usuário:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioAtualizado = {
      id,
      ...user,
    };

    axios.put(`http://127.0.0.1:5000/edit_usuario/${userId}`, usuarioAtualizado)
      .then((response) => {
        console.log('Usuário atualizado com sucesso:', response.data);
        window.location.replace("http://127.0.0.1:5000/ListUser");
      })
      .catch((error) => {
        console.error('Erro ao atualizar usuário:', error);
      });
  }

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit} className="formulario">
        <h2>Editar Usuário</h2>
        <div className="input-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={user.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={user.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={user.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Salvar Alterações</button>
          <button><a href='/' style={{ textDecoration : 'none' }}>Cancelar</a></button>
        </div>
      </form>
    </div>
  );
}

export default EditUsers;