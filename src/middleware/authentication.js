const jwt = require('jsonwebtoken');
const { findByID } = require('../database/userDatabase');
const passwordJwt = process.env.SECRET_KEY;

const verifyLoggedUser = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

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

module.exports = verifyLoggedUser;