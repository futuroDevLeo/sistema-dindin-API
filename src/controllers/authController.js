const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findByEmail } = require("../database/userDatabase");


const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const userExists = await findByEmail(email);

        if (!userExists) {
            return res.status(401).json({ "mensagem": "Usuário e/ou senha inválido(s)." });
        }
        const passwordMatch = await bcrypt.compare(senha, userExists.senha);

        if (!passwordMatch) {
            return res.status(401).json({ "mensagem": "Usuário e/ou senha inválido(s)." });
        }
        const token = jwt.sign(
            {
                id: userExists.id,
            },
            process.env.SECRET_KEY,
            { expiresIn: '8h' });

        return res.status(200).json({
            usuario: {
                id: userExists.id,
                nome: userExists.nome,
                email: userExists.email,
            },
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "mensagem": "Erro ao realizar login." });
    }
};


module.exports = {
    login,
};