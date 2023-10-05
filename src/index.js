const express = require('express');
const router = require('./routes/userRoutes');
const { createTablesIfNotExists } = require('./db');

const app = express();

createTablesIfNotExists();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT,
    console.log(`Servidor rodando na porta na ${process.env.PORT}`)
);

