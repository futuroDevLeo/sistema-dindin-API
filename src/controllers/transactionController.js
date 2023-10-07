const {
    getAllTransactionsDatabase,
    getTransactionByIdDatabase,
    checkTransactionOwnershipForUserDatabase,
    updateTransactionDatabase,
    registerTransactionDatabase
} = require('../database/transactionDatabase');

const getAllTransactions = async (req, res) => {
    const { id } = req.user;
    try {
        const transactions = await getAllTransactionsDatabase(id);
        return res.status(200).json(transactions);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const getTransactionById = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    try {
        const isTransactionOwner = await checkTransactionOwnershipForUserDatabase(id, userId);
        const transactionByID = await getTransactionByIdDatabase(id);
        if (isTransactionOwner.length > 0 && transactionByID.length > 0) {
            return res.status(200).json(transactionByID[0]);
        }

        if (isTransactionOwner.length > 0 || transactionByID.length > 0) {
            return res.status(401).json({ mensagem: `A transação de ID:${id}, não pertence ao usuario logado` });
        }

        return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno de servidor' });
    }
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id: userId } = req.user;
    try {
        const isTransactionOwner = await checkTransactionOwnershipForUserDatabase(id, userId);
        if (isTransactionOwner.length < 1) {
            return res.status(401).json({ message: 'A transação não pertece ao usuário logado. Sem permisão para edição!' });
        }

        const transactionUpdated = await updateTransactionDatabase(id, descricao, valor, data, categoria_id, tipo);
        return res.status(200).json(transactionUpdated);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const registerTransaction = async (req, res) => {
    const { id } = req.user;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const newTransaction = await registerTransactionDatabase(descricao, valor, data, categoria_id, tipo, id);
        return res.status(201).json(newTransaction);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};


module.exports = {
    getAllTransactions,
    updateTransaction,
    registerTransaction,
    getTransactionById
};  