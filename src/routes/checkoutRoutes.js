import express from 'express'
import { addOrders } from '../controllers/checkoutController.js'
import { validateSchema } from "../middlewares/validateSchema.js"
import { addOrderSchema } from '../schemas/checkout.schema.js'

let ordersRouter = express.Router()

ordersRouter.post('/pagamento', validateSchema(addOrderSchema), addOrders)

export default ordersRouter