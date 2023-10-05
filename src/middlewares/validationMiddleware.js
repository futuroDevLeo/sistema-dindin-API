const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: errors.array()[0].msg });
    }
    next();
};

module.exports = validationMiddleware;