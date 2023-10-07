const { getAllTransactionsDatabase,
    checkTransactionOwnershipForUserDatabase,
    updateTransactionDatabase,
    getExtractDatabase,
    deleteTransactionDatabase,
    findByIdTransactionDatabase } = require('../database/transactionDatabase');


const getAllTransactions = async (req, res) => {
    const { id } = req.user;
    try {
        const transactions = await getAllTransactionsDatabase(id);
        res.status(200).json(transactions);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id: userId } = req.user;
    try {
        const isTransactionOwner = await checkTransactionOwnershipForUserDatabase(id, userId);
        if (!isTransactionOwner) {
            return res.status(401).json({ message: 'A transação não pertece ao usuário logado. Sem permisão para edição!' });
        }
        await updateTransactionDatabase(id, descricao, valor, data, categoria_id, tipo);
        res.status(204).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
const getExtract = async (req, res) => {
    try {
        const { id } = req.user;
        const extract = await getExtractDatabase(id);

        extract.entrada = extract.entrada ? extract.entrada : 0;
        extract.saida = extract.saida ? extract.saida : 0;

        res.status(200).json(extract);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    const { id: transactionId } = req.params;
    const { id: userId } = req.user;
    try {
        // verifica se a transação existe
        const transactionExiste = await findByIdTransactionDatabase(transactionId);
        if (!transactionExiste) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        // verifica se a transação pertence ao usuário logado
        const isTransactionOwner = transactionExiste.usuario_id === userId;
        if (isTransactionOwner) {
            return res.status(401).json({ message: 'A transação não pertece ao usuário logado. Sem permisão para exclusão!' });
        }
        await deleteTransactionDatabase(transactionId);
        res.status(204).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTransactions,
    updateTransaction,
    getExtract,
    deleteTransaction
};  