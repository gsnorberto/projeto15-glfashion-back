import express from 'express'
let authRouter = express.Router()
import { signIn, signUp } from '../controllers/authController.js'
import { validateNewUserData } from '../middlewares/userValidation.js'

// Login
authRouter.post('/auth/login', signIn)

// add new user
authRouter.post('/auth/sign-up', validateNewUserData, signUp)

export default authRouter