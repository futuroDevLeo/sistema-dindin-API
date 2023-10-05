const { addNewUserToDB } = require("../database/userDatabase");
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExists = await findByEmail(email);

        if (emailExists) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const hashPassword = await bcrypt.hash(senha, 10);

        const newUser = await addNewUserToDB(nome, email, hashPassword);
        console.log("🚀 ~ file: userController.js:17 ~ createNewUser ~ newUser:", newUser)

        return res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor!" });
    }
};

module.exports = {
    createNewUser
};