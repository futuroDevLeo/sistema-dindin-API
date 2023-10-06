const { Router } = require('express');

const userController = require('../controllers/userController');
const { verifyLoggedUser } = require('../middleware/authentication');
const { validationCreateNewUser, validationUpdateUser } = require('../middleware/userMiddlewares')

const userRouter = Router();

userRouter.post('/usuario',
    validationCreateNewUser,
    userController.createNewUser);

userRouter.put("/usuario",
    verifyLoggedUser,
    validationUpdateUser,
    userController.userUpdate);

userRouter.get('/usuario',
    verifyLoggedUser,
    userController.loggedUserDetails);


module.exports = userRouter;