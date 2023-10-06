const { Router } = require('express');
const { getAllTransactions } = require('../controllers/transactionController');
const { verifyLoggedUser } = require('../middlewares/authentication')

const transactionRouter = Router();

transactionRouter.get('/transacao',
    verifyLoggedUser,
    getAllTransactions);

module.exports = transactionRouter; 