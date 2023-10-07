const { pool } = require('../db')


const getAllCategoriesDatabase = async () => {
    try {
        const query = 'SELECT * FROM categorias';
        const result = await pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return new Error("Erro na consulta de categorias");
    }
};

const getCategoryByIdDatabase = async (id) => {
    const query = {
        text: 'SELECT * FROM categorias WHERE id = $1',
        values: [id]
    };

    try {
        const { rows } = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.log(error);
        return new Error('Erro na consulta da categoria.');
    }
};


module.exports = {
    getAllCategoriesDatabase,
    getCategoryByIdDatabase,
};