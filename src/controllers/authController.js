import db from "../config/database.js"
import bcrypt from "bcrypt"

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

}