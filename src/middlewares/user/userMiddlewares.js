const { body, param } = require('express-validator');
const validationMiddleware = require('../validationMiddleware');

const addNewUserValidation = [
    body("nome").notEmpty().withMessage("Campo nome é obrigatório!"),
    body("email").notEmpty().withMessage("Campo email é obrigatório!"),
    body("senha").notEmpty().withMessage("Campo senha é obrigatório!"),
    validationMiddleware
];

const updateValitation = [
    body("nome").notEmpty().withMessage("Campo nome é obrigatório!"),
    body("email").notEmpty().withMessage("Campo email é obrigatório!"),
    body("senha").notEmpty().withMessage("Campo senha é obrigatório!"),
    validationMiddleware
];

module.exports = {
    addNewUserValidation,
    updateValitation
};