const { userUpdateDatabase, findByEmail } = require("../database/userDatabase");
const bcrypt = require('bcrypt');

const rouds = 10;
const userUpdate = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const emailExists = await findByEmail(email);
        if (emailExists) {
            return res.status(409).json({ "mensagem": "E-mail já cadastrado." });
        }
        const passwordCrypt = await bcrypt.hash(senha, rouds);
        const userUpdated = await userUpdateDatabase(nome, email, passwordCrypt);
        return res.status(204).send();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "mensagem": "Erro ao atualizar usuário." });
    }
};

module.exports = {
    userUpdate,
};

