const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/categoria', categoryController.getAllCategories);


module.exports = categoryRouter;