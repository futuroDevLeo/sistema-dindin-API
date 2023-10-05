const { Router } = require('express');
const { listAllTransactions } = require('../controllers/transactionController');
const { authenticaution } = require('../middlewares/auth/authenticautionMiddlewares');


const transactionRouter = Router();


transactionRouter.get("/transacao", authenticaution, listAllTransactions);


module.exports = {
    transactionRouter
};