const express = require('express');
const routes = require('./routes/index');
const { createTablesIfNotExists } = require('./db');

const app = express();

createTablesIfNotExists();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT,
    console.log(`Servidor rodando na porta na ${process.env.PORT}`)
);

