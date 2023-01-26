import db from "../config/database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

import { stripHtml } from "string-strip-html"

export async function signUp(req, res) {
    let name = stripHtml(req.body.name.trim()).result
    let email = stripHtml(req.body.email.trim()).result
    let password = req.body.password

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    let passwordHash = await bcrypt.hash(password, salt)

    try {
        //check if user exists
        let userExists = await db.collection('users').findOne({ email })

        // if user already exists
        if (userExists) return res.status(409).send("Endereço de email já cadastrado") // conflict

        // Save User
        let data = { name, email, password: passwordHash }
        await db.collection('users').insertOne(data)
        res.sendStatus(200)
    } catch (err) {
        return res.sendStatus(500)
    }
}

export async function signIn(req, res) {
    let email = stripHtml(req.body.email.trim()).result
    let password = stripHtml(req.body.password.trim()).result

    try {
        //check if user exists
        let user = await db.collection('users').findOne({ email })

        // if the user does not exists
        if (!user) return res.sendStatus(401) // unauthorized

        // check password
        const checkPassword = await bcrypt.compare(password, user.password)

        // invalid password
        if (!checkPassword) {
            return res.sendStatus(401) // unauthorized
        }

        // Create Token JWT
        const secret = 'qwerty1234' // TEMPORARY
        const token = jwt.sign({ id: user._id }, secret)

        // Save token
        await db.collection('users').updateOne(
            { _id: ObjectId(user._id) },
            {
                $set: { token }
            }
        )

        let data = { token, name: user.name, _id: user._id }

        // successful login
        res.status(200).json(data)
    } catch (err) {
        return res.sendStatus(500)
    }
}