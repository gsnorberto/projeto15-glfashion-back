import express from 'express'
import { addPurchase, getPurchases, putPurchases, deletePurchases } from '../controllers/purchaseController.js'
import { validateSchema } from "../middlewares/validateSchema.js"
import { addPurchaseSchema, putPurchaseSchema, deletePurchaseSchema } from '../schemas/purchase.schema.js'

let purchaseRouter = express.Router()

purchaseRouter.post('/purchases', validateSchema(addPurchaseSchema), addPurchase)

purchaseRouter.get('/purchases/:idUsuario', getPurchases)

purchaseRouter.put('/purchases', validateSchema(putPurchaseSchema), putPurchases)

purchaseRouter.delete('/purchases', validateSchema(deletePurchaseSchema), deletePurchases)

export default purchaseRouter