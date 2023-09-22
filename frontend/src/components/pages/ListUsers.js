import React, { Component } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      filtroNome: '',
    };
  }

  componentDidMount() {
    this.carregarUsuarios();
  }

  carregarUsuarios = () => {
    axios.get('http://127.0.0.1:5000/listar_usuarios')
      .then((response) => {
        const usuariosComId = response.data.map((usuario, index) => ({
          id: usuario[0],
          nome: usuario[1],
          cpf: usuario[2],
          telefone: usuario[3],
          email: usuario[4],
        }));
        this.setState({ usuarios: usuariosComId });
      })
      .catch((error) => {
        console.error('Erro ao carregar usuários:', error);
      });
  }

  handleFiltroNomeChange = (e) => {
    this.setState({ filtroNome: e.target.value });
  }

  handleFiltrar = () => {
    const { filtroNome } = this.state;
    axios.get(`http://127.0.0.1:5000/listar_usuarios?q=${filtroNome}`)
      .then((response) => {
        const usuariosComId = response.data.map((usuario, index) => ({
          id: usuario[0],
          nome: usuario[1],
          cpf: usuario[2],
          telefone: usuario[3],
          email: usuario[4],
        }));
        this.setState({ usuarios: usuariosComId });
      })
      .catch((error) => {
        console.error('Erro ao filtrar usuários:', error);
      });
  }

  handleExcluirUsuario = (id) => {
    const confirmarExclusao = window.confirm('Deseja realmente excluir este usuário?');
    if (confirmarExclusao) {
      axios.delete(`http://127.0.0.1:5000/delete_usuario/${id}`)
        .then(() => {
          this.carregarUsuarios();
        })
        .catch((error) => {
          console.error('Erro ao excluir usuário:', error);
        });
    }
  }

  render() {
    const { usuarios, filtroNome } = this.state;

    const columns = [
      { field: 'nome', headerName: 'Nome', width: 200 },
      { field: 'cpf', headerName: 'CPF', width: 150 },
      { field: 'telefone', headerName: 'Telefone', width: 150 },
      { field: 'email', headerName: 'Email', width: 300 },
      {
        field: 'acoes',
        headerName: 'Ações',
        width: 200,
        renderCell: (params) => (
          <div>
            <button>
              <Link to={`/EditUsers/${params.row.id}`} 
                style={{ textDecoration : 'none' }}>
                    Editar
              </Link>
            </button>
            <button onClick={() => this.handleExcluirUsuario(params.row.id)}>Excluir</button>
          </div>
        ),
      },
    ];

    return (
      <div>
        <h1>Lista de Usuários</h1>
        <div>
          <input
            type="text"
            placeholder="Filtrar por nome"
            value={filtroNome}
            onChange={this.handleFiltroNomeChange}
          />
          <button onClick={this.handleFiltrar}>Filtrar</button>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={usuarios}
            columns={columns}
            pageSize={5}
          />
        </div>
      </div>
    );
  }
}

export default ListUsers;
