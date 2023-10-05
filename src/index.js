const express = require('express');

const { authRouter, categoryRouter, transactionRouter, userRouter } = require('./routes/routes');
const { createTablesIfNotExists } = require('./db');

const app = express();

createTablesIfNotExists();

app.use(express.json());

app.use(authRouter);
app.use(categoryRouter);
app.use(transactionRouter);
app.use(userRouter);


app.listen(process.env.PORT,
    console.log(`Servidor rodando na porta na ${process.env.PORT}`)
);

