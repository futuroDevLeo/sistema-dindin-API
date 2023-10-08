const { body, param } = require('express-validator');

const { validationMiddleware } = require('./validationMiddleware');

const validateCreateTransaction = [
    body('descricao').notEmpty().withMessage('Descrição é obrigatória'),
    body('valor').notEmpty().withMessage('Valor é obrigatório'),
    body('data').notEmpty().withMessage('Data é obrigatória'),
    body('categoria_id').notEmpty().withMessage('Categoria é obrigatória'),
    body('tipo').notEmpty().withMessage('Tipo é obrigatório').custom(value => {
        if (value !== 'entrada' && value !== 'saida') {
            throw new Error('Tipo deve ser "entrada" ou "saida"');
        }
        return true;
    }),
    validationMiddleware,
];

const validateUpdateTransaction = [
    param('id').notEmpty().withMessage('Id da transação é obrigatório.').isNumeric().withMessage('Id da transação deve ser um número.'),
    body('descricao').notEmpty().withMessage('Descrição é obrigatória'),
    body('valor').notEmpty().withMessage('Valor é obrigatório'),
    body('data').notEmpty().withMessage('Data é obrigatória'),
    body('categoria_id').notEmpty().withMessage('Categoria é obrigatória'),
    body('tipo').notEmpty().withMessage('Tipo é obrigatório').custom(value => {
        if (value !== 'entrada' && value !== 'saida') {
            throw new Error('Tipo deve ser "entrada" ou "saida"');
        }
        return true;
    }),
    validationMiddleware,
];

const validateDeleteTransaction = [
    param('id').notEmpty().withMessage('Id da transação é obrigatório.').isNumeric().withMessage('Id da transação deve ser um número.'),
    validationMiddleware,
];

const validateGetTransaction = [
    param('id').notEmpty().withMessage('Id da transação é obrigatório.').isNumeric().withMessage('Id da transação deve ser um número.'),
    validationMiddleware,
];


module.exports = {
    validateUpdateTransaction,
    validateCreateTransaction,
    validateDeleteTransaction,
    validateGetTransaction
};