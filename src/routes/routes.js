const { authRouter } = require("./authRoutes")
const { categoryRouter } = require("./categoryRoutes")
const { transactionRouter } = require("./transactionRoutes")
const { userRouter } = require("./userRoutes")

module.exports = {
    authRouter,
    categoryRouter,
    transactionRouter,
    userRouter
}