const { body, param } = require('express-validator');

const { validationMiddleware } = require('./validationMiddleware');

const validationLogin = [
    body('email').isEmail().withMessage('O campo "email" deve ser um email válido').notEmpty().withMessage(' O campo email é obrigatório!'),
    body('password').isLength({ min: 4 }).withMessage('O campo "password" deve ter pelo menos 4 caracteres').notEmpty().withMessage(' O campo senha é obrigatório!'),
    validationMiddleware,
];

module.exports = {
    validationLogin,
}