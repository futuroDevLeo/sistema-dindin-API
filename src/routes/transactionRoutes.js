const { Router } = require('express');

const transactionController = require('../controllers/transactionController');

const { verifyLoggedUser } = require('../middlewares/authentication')
const { validateUpdateTransaction } = require('../middlewares/transactionMiddlewares')

const transactionRouter = Router();

transactionRouter.get('/transacao',
    verifyLoggedUser,
    transactionController.getAllTransactions);

transactionRouter.put('/transacao/:id',
    verifyLoggedUser,
    validateUpdateTransaction,
    transactionController.updateTransaction);

module.exports = transactionRouter; 