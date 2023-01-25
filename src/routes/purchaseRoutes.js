import express from 'express'
import { addPurchase, getPurchases, putPurchases, deletePurchases } from '../controllers/purchaseController.js'
import { validateSchema } from "../middlewares/validateSchema.js"
import { addPurchaseSchema, putPurchaseSchema, deletePurchaseSchema } from '../schemas/purchase.schema.js'

let purchaseRouter = express.Router()

// add purchase created by user
purchaseRouter.post('/purchases', validateSchema(addPurchaseSchema), addPurchase)

// get all user purchases
purchaseRouter.get('/purchases', getPurchases)

purchaseRouter.put('/purchases', validateSchema(putPurchaseSchema), putPurchases)

purchaseRouter.delete('/purchases', validateSchema(deletePurchaseSchema), deletePurchases)

export default purchaseRouter