const pool = require('../db');

const addNewUserToDB = async (nome, email, hashPassword) => {
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

module.exports = {
    addNewUserToDB
};