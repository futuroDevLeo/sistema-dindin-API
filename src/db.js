const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
    // ssl: true
});

const createTablesIfNotExists = async () => {
    const createTableUsers = `
            create table if not exists usuarios (
            id serial primary key,
            nome text not null,
            email text unique not null,
            senha text not null
           );
        `;

    await pool.query(createTableUsers);

    const createTableCategorys = `
        create table if not exists categorias (
            id serial primary key,
            descricao text not null
           );
        `;

    await pool.query(createTableCategorys);

    const createTableTransactions = `
        create table if not exists transacoes (
            id serial primary key,
            descricao text not null,
            valor integer not null,
            data date not null,
            categoria_id integer not null references categorias(id),
            usuario_id integer not null references usuarios(id),
            tipo text not null
           );
        `;

    await pool.query(createTableTransactions);

};

module.exports = {
    pool,
    createTablesIfNotExists
};
