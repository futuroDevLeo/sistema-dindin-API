const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.put("/usuario", userController.userUpdate)

module.exports = userRouter;