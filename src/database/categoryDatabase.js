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


module.exports = {
    getAllCategoriesDatabase,
}