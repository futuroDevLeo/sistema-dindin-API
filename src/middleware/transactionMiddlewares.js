const { body, param } = require('express-validator');

const { validationMiddleware } = require('./validationMiddleware');


const validateUpdateTransaction = [
    param('id').notEmpty().withMessage('Id da transação é obrigatório.'),
    body('descricao').notEmpty().withMessage('Descrição é obrigatória'),
    body('valor').notEmpty().withMessage('Valor é obrigatório'),
    body('data').withMessage('Data é obrigatória'),
    body('categoria_id').notEmpty().withMessage('Categoria é obrigatória'),
    body('tipo').notEmpty().withMessage('Tipo é obrigatório').custom(value => {
        if (value !== 'entrada' && value !== 'saida') {
            throw new Error('Tipo deve ser "entrada" ou "saida"');
        }
        return true;
    }),
    validationMiddleware,
];


module.exports = {
    validateUpdateTransaction,
};