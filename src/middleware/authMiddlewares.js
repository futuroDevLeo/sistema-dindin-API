const jwt = require('jsonwebtoken');
const { findByID } = require('../database/userDatabase');
const { body, param } = require('express-validator');
const { validationMiddleware } = require('./validationMiddleware');

const passwordJwt = process.env.SECRET_KEY;

const verifyLoggedUser = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    try {
        const { id } = jwt.verify(token, passwordJwt);

        const { rows, rowCount } = await findByID(id);

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        req.user = rows[0];

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ mensagem: 'Erro interno do servidor' });
    }
};

const validationLogin = [
    body('email').isEmail().withMessage('O campo "email" deve ser um email válido').notEmpty().withMessage(' O campo email é obrigatório!'),
    body('senha').isLength({ min: 4 }).withMessage('O campo "senha" deve ter pelo menos 4 caracteres').notEmpty().withMessage(' O campo senha é obrigatório!'),
    validationMiddleware,
];


module.exports = {
    validationLogin,
    verifyLoggedUser,
};