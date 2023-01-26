import Joi from "joi";

export const addPurchaseSchema = Joi.object({
    idUsuario: Joi.string().required(),
    idProduct: Joi.string().required(),
    size: Joi.string().valid('PP', 'P', 'M', 'G', 'GG'),
    quantity: Joi.number().integer().min(1).required()
})

export const putPurchaseSchema = Joi.object({
    idPurchase: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    idProduct: Joi.string().required()
})

export const deletePurchaseSchema = Joi.object({
    idPurchase: Joi.string().required()
})