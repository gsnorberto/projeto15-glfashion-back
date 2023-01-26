import { addUserSchema, userValidationSchema } from "../schemas/users.schema.js"
import { stripHtml } from "string-strip-html"

export const validateNewUserData = (req, res, next) => {
    let name = stripHtml(req.body.name.trim()).result
    let email = stripHtml(req.body.email.trim()).result
    let password = req.body.password.trim()
    let confirmPassword = req.body.confirmPassword.trim()

    let data = { name, email, password, confirmPassword}
    const { error } = addUserSchema.validate(data)

    if(error == null) {
        next();
    } else {
        res.status(422).json({ error: "Dados inválidos" });
    }
}

export const validateUserData = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body)

    if(error == null) {
        next();
    } else {
        res.status(422).json({ error: "Dados inválidos" });
    }
}