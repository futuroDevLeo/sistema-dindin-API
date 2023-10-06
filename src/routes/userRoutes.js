const { Router } = require('express');

const userController = require('../controllers/userController');
const verifyLoggedUser = require('../middleware/authentication');

const userRouter = Router();

userRouter.post('/usuario', userController.createNewUser);

userRouter.use(verifyLoggedUser);

userRouter.put("/usuario", userController.userUpdate);
userRouter.get('/usuario', userController.loggedUserDetails);

module.exports = userRouter;
