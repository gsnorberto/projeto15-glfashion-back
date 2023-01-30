import Joi from "joi";

export const addOrderSchema = Joi.object({
    idUsuario: Joi.string().required(),
    pedidos: Joi.array().min(1).required(),
    address: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.number().integer().required(),
    pagamento: Joi.string().required()
})