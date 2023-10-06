const { Router } = require('express');

const userController = require('../controllers/userController');
const verifyLoggedUser = require('../middleware/authentication');
const { validationCreateNewUser, validationUpdateUser } = require('../middleware/validationMiddleware')

const userRouter = Router();

userRouter.post('/usuario', userController.createNewUser);

userRouter.use(verifyLoggedUser);

userRouter.put("/usuario",
    validationCreateNewUser,
    userController.userUpdate);

userRouter.get('/usuario',
    userController.loggedUserDetails);

userRouter.get('/usuario',
    validationUpdateUser,
    userController.loggedUserDetails);

module.exports = userRouter;