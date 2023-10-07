const { Router } = require('express');

const transactionController = require('../controllers/transactionController');

const { verifyLoggedUser } = require('../middleware/authentication');

const transactionMiddlewares = require('../middleware/transactionMiddlewares');

const transactionRouter = Router();

transactionRouter.get('/transacao',
    verifyLoggedUser,
    transactionController.getAllTransactions
);

transactionRouter.get('/transacao/extrato',
    verifyLoggedUser,
    transactionController.getExtract);


transactionRouter.get('/transacao/:id',
    verifyLoggedUser,
    transactionMiddlewares.validateGetTransaction,
    transactionController.getTransactionById
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

transactionRouter.delete('/transacao/:id',
    verifyLoggedUser,
    transactionMiddlewares.validateDeleteTransaction,
    transactionController.deleteTransaction);


module.exports = transactionRouter;
