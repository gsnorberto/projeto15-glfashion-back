import express from 'express'
let productRouter = express.Router()
import { addProduct, getProduct, getProducts  } from '../controllers/productController.js'

// create new products
productRouter.post('/product', addProduct)

// get all products
productRouter.get('/all-products', getProducts)

// get product by id
productRouter.get('/product/:ID_PRODUCT', getProduct)


export default productRouter