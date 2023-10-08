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

const getFilteredTransactionsDatabase = async (userId, filtro) => {
    const query = {
        text: `
        SELECT
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
       WHERE categorias.descricao ILIKE ANY ($1)
       and transacoes.usuario_id = $2;
        `,
        values: [filtro, userId],
    }
    try {
        const transactionsFilted = await pool.query(query);
        return transactionsFilted.rows;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro na consulta das transações.');
    }
};

const getTransactionByIdDatabase = async (id) => {
    const query = {
        text: 'SELECT * FROM transacoes WHERE id = $1',
        values: [id]
    };

    try {
        const { rows } = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.log(error);
        return new Error('Erro na consulta da transação.');
    }
};

const checkTransactionOwnershipForUserDatabase = async (transactionId, userId) => {
    const query = {
        text: `SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2`,
        values: [transactionId, userId],
    };
    try {
        const { rows } = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro na consulta da transação.');
    }
};

const updateTransactionDatabase = async (transactionId, descricao, valor, data, categoria_id, tipo) => {
    const query = {
        text: `UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
        WHERE id = $6 returning *`,
        values: [descricao, valor, data, categoria_id, tipo, transactionId],
    };
    try {
        const { rows } = await pool.query(query);
        return rows[0];
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar transação.');
    }
};

const registerTransactionDatabase = async (descricao, valor, data, categoria_id, tipo, usuario_id) => {
    const query = {
        text: `INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo)
    VALUES ($1, $2, $3, $4, $5, $6) returning *`,
        values: [descricao, valor, data, categoria_id, usuario_id, tipo]
    };

    try {
        const { rows } = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar transação.');
    }
};

const getExtractDatabase = async (userId) => {
    try {
        const query = {
            text: `
            SELECT
                SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END) as entrada,
                SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END) as saida
            FROM
                transacoes
            WHERE
                usuario_id = $1;
            `,
            values: [userId],
        }
        const { rows } = await pool.query(query);
        const { entrada, saida } = rows[0];
        const extract = {
            entrada: +entrada,
            saida: +saida
        };
        return extract;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao buscar extrato.');
    }
};

const deleteTransactionDatabase = async (transactionId) => {
    const query = {
        text: `DELETE FROM transacoes WHERE id = $1`,
        values: [transactionId],
    };
    try {
        await pool.query(query);
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao deletar transação.');
    }
};


module.exports = {
    getAllTransactionsDatabase,
    getTransactionByIdDatabase,
    checkTransactionOwnershipForUserDatabase,
    updateTransactionDatabase,
    registerTransactionDatabase,
    getExtractDatabase,
    deleteTransactionDatabase,
    getFilteredTransactionsDatabase,
};