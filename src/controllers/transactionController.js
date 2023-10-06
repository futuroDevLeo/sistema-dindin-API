const { getAllTransactionsDatabase, checkTransactionOwnershipForUserDatabase, updateTransactionDatabase } = require('../database/transactionDatabase');


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

module.exports = {
    getAllTransactions,
    updateTransaction,
};  