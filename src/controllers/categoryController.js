const { getAllCategoriesDatabase } = require('../database/categoryDatabase');


const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoriesDatabase();
        res.status(200).json(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllCategories,
};