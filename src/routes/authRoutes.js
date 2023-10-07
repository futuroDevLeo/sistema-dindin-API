const { Router } = require('express');

const authController = require('../controllers/authController');

const { validationLogin } = require('../middleware/authMiddlewares');

const authRouter = Router();

authRouter.post('/login',
    validationLogin,
    authController.login
);

module.exports = authRouter;