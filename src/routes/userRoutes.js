const { Router } = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddlewares');

const { validationCreateNewUser, validationUpdateUser } = require('../middleware/userMiddlewares');

const userRouter = Router();

userRouter.post('/usuario',
    validationCreateNewUser,
    userController.createNewUser
);

userRouter.put("/usuario",
    authMiddleware.verifyLoggedUser,
    validationUpdateUser,
    userController.userUpdate
);

userRouter.get('/usuario',
    authMiddleware.verifyLoggedUser,
    userController.loggedUserDetails
);


module.exports = userRouter;