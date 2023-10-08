const { body, param } = require('express-validator');

const { validationMiddleware } = require('./validationMiddleware');

const validationCreateNewUser = [
    body('nome').notEmpty().withMessage('O nome é obrigatório!').isLength({ min: 3 }).withMessage("o campo 'nome ' deve ter pelo menos 3 caracteres!"),
    body('email').isEmail().withMessage('O campo "email" deve ser um email válido').notEmpty().withMessage(' O campo email é obrigatório!'),
    body('senha').isLength({ min: 4 }).withMessage('O campo "senha" deve ter pelo menos 4 caracteres').notEmpty().withMessage(' O campo senha é obrigatório!'),
    validationMiddleware
];

const validationUpdateUser = [
    body('nome').notEmpty().withMessage('O nome é obrigatório!').isLength({ min: 3 }).withMessage("o campo 'nome ' deve ter pelo menos 3 caracteres!"),
    body('email').isEmail().withMessage('O campo "email" deve ser um email válido').notEmpty().withMessage(' O campo email é obrigatório!'),
    body('senha').isLength({ min: 4 }).withMessage('O campo "senha" deve ter pelo menos 4 caracteres').notEmpty().withMessage(' O campo senha é obrigatório!'),
    validationMiddleware
];


module.exports = {
    validationCreateNewUser,
    validationUpdateUser
};