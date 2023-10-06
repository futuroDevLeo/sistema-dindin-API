const { pool } = require('../db')


const getAllCategories = async () => {
    try {
        const query = 'SELECT * FROM category';
        const result = await pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        return new Error("Erro na consulta de categorias");
    }
};


module.exports = {
    getAllCategories,
}