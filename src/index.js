const express = require('express');
const router = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT,
    console.log(`Servidor rodando na porta na ${process.env.PORT}`)
);