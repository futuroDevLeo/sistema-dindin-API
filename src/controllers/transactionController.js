const { listAllTransactionsDatabase } = require('../database/transactionDatabase');


const listAllTransactions = async (req, res) => {
    const { id } = req.user;
    try {
        const transactions = await listAllTransactionsDatabase(id);
        return res.status(200).json(transactions);
    }
    catch (error) {
        return res.status(400).json({ messagem: "Erro na consultas das transações." });
    }
};


module.exports = {
    listAllTransactions
};