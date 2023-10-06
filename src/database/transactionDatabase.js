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

const checkTransactionOwnershipForUserDatabase = async (transactionId, userId) => {
    const query = {
        text: `SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2`,
        values: [transactionId, userId],
    };
    try {
        const { rows } = await pool.query(query);
        return rows.length > 0;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro na consulta da transação.');
    }
};

const updateTransactionDatabase = async (transactionId, descricao, valor, data, categoria_id, tipo) => {
    // atualizar transação	
    const query = {
        text: `UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6`,
        values: [descricao, valor, data, categoria_id, tipo, transactionId],
    };
    try {
        await pool.query(query);
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar transação.');
    }
};
module.exports = {
    getAllTransactionsDatabase,
    checkTransactionOwnershipForUserDatabase,
    updateTransactionDatabase,
};