const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const { createTablesIfNotExists } = require('./db');

const app = express();

createTablesIfNotExists();

app.use(express.json());

app.use(authRouter);
app.use(userRouter);

app.listen(process.env.PORT,
    console.log(`Servidor rodando na porta na ${process.env.PORT}`)
);

