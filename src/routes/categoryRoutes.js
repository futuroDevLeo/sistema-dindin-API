const { Router } = require('express');

const categoryController = require('../controllers/categoryController');
const { authenticaution } = require('../middlewares/auth/authenticautionMiddlewares')


const categoryRouter = Router();

categoryRouter.get("/categoria",
    authenticaution,
    categoryController.listAllCategories);





module.exports = { categoryRouter };
