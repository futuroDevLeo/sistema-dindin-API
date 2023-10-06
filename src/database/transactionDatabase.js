const { pool } = require('../db');


const getAllTransactionsDatabase = async (userId) => {
    const query = {
        text: `SELECT
        transacoes.id,
        transacoes.tipo,
        transacoes.descricao,
        transacoes.valor,
        transacoes.data,
        transacoes.usuario_id,
        transacoes.categoria_id,
        categorias.descricao AS categoria_nome
      FROM
        transacoes
      JOIN
        categorias ON transacoes.categoria_id = categorias.id
       WHERE transacoes.usuario_id = $1;`,
        values: [userId],
    };
    try {
        const { rows } = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro na consulta das transações.');
    }
};

module.exports = {
    getAllTransactionsDatabase,
};