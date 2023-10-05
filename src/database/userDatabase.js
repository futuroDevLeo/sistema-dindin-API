const { pool } = require('../db');



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
};