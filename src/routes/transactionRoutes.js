const { Router } = require('express');

const transactionController = require('../controllers/transactionController');

const { verifyLoggedUser } = require('../middleware/authentication')
const transactionMiddlewares = require('../middleware/transactionMiddlewares')

const transactionRouter = Router();

transactionRouter.get('/transacao',
    verifyLoggedUser,
    transactionController.getAllTransactions
);

transactionRouter.put('/transacao/:id',
    verifyLoggedUser,
    transactionMiddlewares.validateUpdateTransaction,
    transactionController.updateTransaction
);

transactionRouter.post('/transacao',
    verifyLoggedUser,
    transactionMiddlewares.validateCreateTransaction,
    transactionController.registerTransaction
);


module.exports = transactionRouter;
