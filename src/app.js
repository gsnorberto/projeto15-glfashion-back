import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import purchaseRouter from './routes/purchaseRoutes.js'
import productRouter from './routes/productRoutes.js'
import authRouter from './routes/authRoutes.js'
import ordersRouter from './routes/checkoutRoutes.js'
dotenv.config()
const corsOptions = {
  origin: '*'
}
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use([purchaseRouter, productRouter, authRouter, ordersRouter])

let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`)
})