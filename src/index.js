const express = require('express');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const authRouter = require('./routes/authRoutes');
const { createTablesIfNotExists } = require('./db');

const app = express();

createTablesIfNotExists();

app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(transactionRouter);


app.listen(process.env.PORT,
    console.log(`Servidor rodando na porta na ${process.env.PORT}`)
);
