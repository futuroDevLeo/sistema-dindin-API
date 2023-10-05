const { Router } = require('express');

const authController = require('../controllers/authController');
const { loginValidation } = require('../middlewares/auth/authenticautionMiddlewares');


const authRouter = Router();

authRouter.post('/login', loginValidation, authController.login);

module.exports = { authRouter };