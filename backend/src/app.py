from flask import Flask, request, redirect, url_for, jsonify
import sqlite3
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DATABASE = 'usuarios.db'

def create_table():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            telefone TEXT,
            email TEXT
        )
    ''')
    conn.commit()
    conn.close()

create_table()

@app.route('/listar_usuarios')
def listar_usuario():
    search_query = request.args.get('q', '')

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    if search_query:
        cursor.execute('SELECT * FROM usuarios WHERE nome LIKE ?', ('%' + search_query + '%',))
    else:
        cursor.execute('SELECT * FROM usuarios')
    
    usuarios = cursor.fetchall()
    conn.close()

    return jsonify(usuarios)

@app.route('/add_usuario', methods=['POST'])
def add_usuario():
    data = request.get_json()
    nome = data.get('nome')
    cpf = data.get('cpf')
    telefone = data.get('telefone')
    email = data.get('email')

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT INTO usuarios (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)', (nome, cpf, telefone, email))
        conn.commit()
        return "Usuário criado com sucesso", 201
    except sqlite3.IntegrityError:
        conn.rollback()
        return "CPF já cadastrado!", 400
    finally:
        conn.close()

@app.route('/edit_usuario/<int:id>', methods=['GET', 'PUT'])
def edit_usuario(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    if request.method == 'PUT':
        data = request.get_json()
        nome = data.get('nome')
        cpf = data.get('cpf')
        telefone = data.get('telefone')
        email = data.get('email')

        try:
            cursor.execute('''
                UPDATE usuarios
                SET nome=?, cpf=?, telefone=?, email=?
                WHERE id=?
            ''', (nome, cpf, telefone, email, id))
            conn.commit()
        except sqlite3.IntegrityError:
            conn.rollback()
            return "CPF já cadastrado!", 400
        finally:
            conn.close()
        return redirect(url_for('edit_usuario', id=id))
    else:
        cursor.execute('SELECT * FROM usuarios WHERE id = ?', (id,))
        usuario = cursor.fetchone()
        conn.close()
        return jsonify(usuario)

@app.route('/delete_usuario/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    try:
        cursor.execute('DELETE FROM usuarios WHERE id = ?', (id,))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.rollback()
        return jsonify({'message': 'Erro ao excluir usuário'}), 400
    finally:
        conn.close()

    return jsonify({'message': 'Usuário excluído com sucesso'}), 200