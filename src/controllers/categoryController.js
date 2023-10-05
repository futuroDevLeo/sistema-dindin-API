



const listAllCategories = async (req, res) => {
    try {
        const categories = await listAllCategories();
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(400).json({ messagem: "Erro na consulta das categorias." });
    }
};


module.exports = {
    listAllCategories
};