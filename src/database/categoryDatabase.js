const { pool } = require('../db');

const listAllCategoriesDatabase = async () => {
    const query = {
        text: 'SELECT * FROM categorias',
    }
    try {
        const { rows } = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro na consulta das categorias.');
    }
};

module.exports = {
    listAllCategoriesDatabase
};