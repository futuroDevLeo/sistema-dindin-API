const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { findById } = require('../../database/userDatabase');

const validationMiddleware = require('../validationMiddleware');

const authenticaution = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await findById(id);
        if (!user) {
            return res.status(401).json({ message: 'Acesso não autorizado!' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token expirado ou inválido' });
    }

};

const loginValidation = [
    body("email").notEmpty().withMessage("Campo email é obrigatório!"),
    body("senha").notEmpty().withMessage("Campo senha é obrigatório!"),
    validationMiddleware
];

module.exports = {
    authenticaution,
    loginValidation
};