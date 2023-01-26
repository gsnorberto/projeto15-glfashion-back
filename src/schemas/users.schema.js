import Joi from "joi";

export const addUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
})

export const userValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})