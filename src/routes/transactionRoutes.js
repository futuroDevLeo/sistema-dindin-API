const { Router } = require('express');

const authMiddleware = require('../middleware/authMiddlewares');
const transactionController = require('../controllers/transactionController');
const transactionMiddlewares = require('../middleware/transactionMiddlewares');

const transactionRouter = Router();

transactionRouter.get('/transacao',
    authMiddleware.verifyLoggedUser,
    transactionController.getAllTransactions
);

transactionRouter.get('/transacao/extrato',
    authMiddleware.verifyLoggedUser,
    transactionController.getExtract
);


transactionRouter.get('/transacao/:id',
    authMiddleware.verifyLoggedUser,
    transactionMiddlewares.validateGetTransaction,
    transactionController.getTransactionById
);

transactionRouter.put('/transacao/:id',
    authMiddleware.verifyLoggedUser,
    transactionMiddlewares.validateUpdateTransaction,
    transactionController.updateTransaction
);

transactionRouter.post('/transacao',
    authMiddleware.verifyLoggedUser,
    transactionMiddlewares.validateCreateTransaction,
    transactionController.registerTransaction
);

transactionRouter.delete('/transacao/:id',
    authMiddleware.verifyLoggedUser,
    transactionMiddlewares.validateDeleteTransaction,
    transactionController.deleteTransaction
);


module.exports = transactionRouter;
