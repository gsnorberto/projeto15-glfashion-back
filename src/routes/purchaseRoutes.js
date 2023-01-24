import express from 'express'
let purchaseRouter = express.Router()
import { addPurchase, getPurchases } from '../controllers/purchaseController.js'

// add purchase created by user
purchaseRouter.post('/purchase', addPurchase)

// get all user purchases
purchaseRouter.post('/all-purchases', getPurchases)

export default purchaseRouter