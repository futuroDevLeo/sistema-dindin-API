const {
    getAllTransactionsDatabase,
    getFilteredTransactionsDatabase,
    getTransactionByIdDatabase,
    checkTransactionOwnershipForUserDatabase,
    updateTransactionDatabase,
    registerTransactionDatabase,
    getExtractDatabase,
    deleteTransactionDatabase,
} = require('../database/transactionDatabase');

const { getCategoryByIdDatabase } = require('../database/categoryDatabase');

const getAllTransactions = async (req, res) => {
    const { id } = req.user;
    const { filtro } = req.query;

    try {
        if (filtro) {
            const transactionsFiltered = await getFilteredTransactionsDatabase(id, filtro);
            return res.status(200).json(transactionsFiltered);
        }

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
        if (isTransactionOwner.length > 0 && transactionByID) {
            return res.status(200).json(transactionByID);
        }

        if (isTransactionOwner.length > 0 || transactionByID) {
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
        const categoryExiste = await getCategoryByIdDatabase(categoria_id);

        if (!categoryExiste) {
            return res.status(400).json({ mensagem: 'Categoria não encontrada.' });
        }

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

const getExtract = async (req, res) => {
    try {
        const { id } = req.user;
        const extract = await getExtractDatabase(id);

        extract.entrada = extract.entrada ? extract.entrada : 0;
        extract.saida = extract.saida ? extract.saida : 0;

        return res.status(200).json(extract);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno de servidor.' });
    }
};

const deleteTransaction = async (req, res) => {
    const { id: transactionId } = req.params;
    const { id: userId } = req.user;

    try {
        const transactionExiste = await getTransactionByIdDatabase(transactionId);

        if (!transactionExiste) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const isTransactionOwner = transactionExiste.usuario_id === userId;

        if (!isTransactionOwner) {
            return res.status(401).json({ mensagem: 'A transação não pertece ao usuário logado. Sem permisão para exclusão!' });
        }

        const deletedTransaction = await deleteTransactionDatabase(transactionId);
        return res.status(200).json(deletedTransaction);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const registerTransaction = async (req, res) => {
    const { id } = req.user;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const categoryExiste = await getCategoryByIdDatabase(categoria_id);
        if (!categoryExiste) {
            return res.status(400).json({ mensagem: 'Categoria não encontrada.' });
        }
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
    getTransactionById,
    getExtract,
    deleteTransaction
};  