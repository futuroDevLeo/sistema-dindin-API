const { Router } = require('express');
const { getAllTransactions } = require('../controllers/transactionController');


const transactionRouter = Router();

transactionRouter.get('/transacao', getAllTransactions);

module.exports = transactionRouter; 