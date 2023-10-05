const { pool } = require('../db');

const addNewUserDatabase = async (nome, email, hashPassword) => {
    try {
        const newUser = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
            [nome, email, hashPassword]
        );
        return newUser.rows[0];
    } catch (error) {
        return new Error('Erro no cadastro do usuário.');
    }
};

const userUpdateDatabase = async (nome, email, senha) => {
    const query = {
        text: 'UPDATE usuarios SET nome = $1, senha = $2 WHERE email = $3',
        values: [nome, senha, email]
    };
    try {
        await pool.query(query);
    }
    catch (error) {
        console.log(error);
        return new Error('Erro na atualização do usuário.');
    }
};

const findByEmail = async (email) => {

    const query = {
        text: 'SELECT * FROM  usuarios WHERE email = $1',
        values: [email]
    };

    try {
        const user = await pool.query(query);
        return user.rows[0];
    }
    catch (error) {
        console.log(error);
        return new Error('Erro na consulta por email.');
    }
};

const existEmailDatabase = async (email, id) => {

    const query = {
        text: 'SELECT * FROM usuarios WHERE email = $1 and id != $2',
        values: [email, id]
    };

    try {
        const user = await pool.query(query);
        return user.rows[0];
    }
    catch (error) {
        console.log(error);
        return new Error('Email já cadastrado em outra conta.');
    }
};


module.exports = {
    findByEmail,
    addNewUserDatabase,
    userUpdateDatabase,
    existEmailDatabase
};