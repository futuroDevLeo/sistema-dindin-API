const pool = require('../db');

const addNewUserDatabase = async (nome, email, hashPassword) => {
    try {
        const newUser = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
            [nome, email, hashPassword]
        );
        return newUser.rows[0];
    } catch (error) {
        new Error('Erro no cadastro do usuário.');
    }
};

const userUpdateDatabase = async (nome, email, senha) => {
    const query = {
        text: 'UPDATE usuarios SET nome = ?, senha = ? WHERE email = ?',
        values: [nome, senha, email]
    };
    try {
        await pool.query(query);
    }
    catch (error) {
        console.log(error);
        new Error('Erro na atualização do usuário.');
    }
};

const findByEmail = async (email) => {

    const query = {
        text: 'SELECT * FROM  usuarios WHERE email = ?',
        values: [email]
    };

    try {
        const user = await pool.query(query);
        return user.rows[0];
    }
    catch (error) {
        console.log(error);
        new Error('Erro na consulta por email.');
    }
};


module.exports = {
    findByEmail,
    addNewUserDatabase,
    userUpdateDatabase
};