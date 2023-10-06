const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const { verifyLoggedUser } = require('../middleware/authentication')

const categoryRouter = Router();

categoryRouter.get('/categoria',
    verifyLoggedUser,
    categoryController.getAllCategories);


module.exports = categoryRouter;