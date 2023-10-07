const { Router } = require('express');

const transactionController = require('../controllers/transactionController');

const { verifyLoggedUser } = require('../middleware/authentication')
const { validateUpdateTransaction, validateDeleteTransaction } = require('../middleware/transactionMiddlewares')

const transactionRouter = Router();

transactionRouter.get('/transacao',
    verifyLoggedUser,
    transactionController.getAllTransactions);

transactionRouter.put('/transacao/:id',
    verifyLoggedUser,
    validateUpdateTransaction,
    transactionController.updateTransaction);

transactionRouter.get('/transacao/extrato',
    verifyLoggedUser,
    transactionController.getExtract);

transactionRouter.delete('/transacao/:id',
    verifyLoggedUser,
    validateDeleteTransaction,
    transactionController.deleteTransaction);

module.exports = transactionRouter;

