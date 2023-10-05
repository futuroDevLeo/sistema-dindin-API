const { pool } = require('../db');


const findByEmail = async (email) => {

    const query = {
        text: 'SELECT * FROM  usuarios WHERE email = ?',
        values: [email]
    };

    try {
        const user = await pool.query(query);
        return user.rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
};


module.exports = {
    findByEmail,
};