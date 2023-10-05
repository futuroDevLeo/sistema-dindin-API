const { Router } = require('express');
const { authenticaution } = require('../middlewares/auth/authenticautionMiddlewares');
const { addNewUserValidation, updateValitation } = require('../middlewares/user/userMiddlewares');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/usuario',
    addNewUserValidation,
    userController.createNewUser);

userRouter.put("/usuario",
    authenticaution,
    updateValitation,
    userController.userUpdate);

module.exports = { userRouter };
