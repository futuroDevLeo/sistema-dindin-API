const { getAllTransactionsDatabase } = require('../database/transactionDatabase');


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


module.exports = {
    getAllTransactions,
};  