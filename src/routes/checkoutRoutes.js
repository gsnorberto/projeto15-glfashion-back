import express from 'express'
import { addOrders, getOrders } from '../controllers/checkoutController.js'
import { validateSchema } from "../middlewares/validateSchema.js"
import { addOrderSchema } from '../schemas/checkout.schema.js'

let ordersRouter = express.Router()

ordersRouter.post('/orders', validateSchema(addOrderSchema), addOrders)

ordersRouter.get('/orders/:idUsuario', getOrders)

export default ordersRouter