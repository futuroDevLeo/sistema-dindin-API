const bcrypt = require('bcrypt');
const {
    addNewUserDatabase,
    userUpdateDatabase,
    findByEmail,
    existEmailDatabase,
    findByID
} = require("../database/userDatabase");

const rouds = 10;


const createNewUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExists = await findByEmail(email);

        if (emailExists) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const hashPassword = await bcrypt.hash(senha, rouds);

        const newUser = await addNewUserDatabase(nome, email, hashPassword);

        return res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor!" });
    }
};

const userUpdate = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.user;
    try {
        const emailExists = await existEmailDatabase(email, id);

        if (emailExists) {
            return res.status(409).json({ "mensagem": "E-mail já cadastrado." });
        }
        const passwordCrypt = await bcrypt.hash(senha, rouds);
        const userUpdated = await userUpdateDatabase(nome, email, passwordCrypt);
        return res.status(200).json(userUpdated);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "mensagem": "Erro ao atualizar usuário." });
    }
};

const loggedUserDetails = async (req, res) => {
    const { id } = req.user;

    try {
        if (!id) {
            return res.status(401).json({ mensagem: "É necessário fazer login." })
        }

        const { rows } = await findByID(id);

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
};


module.exports = {
    createNewUser,
    userUpdate,
    loggedUserDetails
};

