const { Router } = require('express');

const transactionController = require('../controllers/transactionController');

const { verifyLoggedUser } = require('../middleware/authentication')
const { validateUpdateTransaction } = require('../middleware/transactionMiddlewares')

const transactionRouter = Router();

transactionRouter.get('/transacao',
    verifyLoggedUser,
    transactionController.getAllTransactions);

transactionRouter.put('/transacao/:id',
    verifyLoggedUser,
    validateUpdateTransaction,
    transactionController.updateTransaction);

module.exports = transactionRouter;

