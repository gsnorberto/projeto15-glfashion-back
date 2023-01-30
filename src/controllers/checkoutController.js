import db from "../config/database.js"
import { ObjectId } from "mongodb"

export async function addOrders(req, res) { 
    try {
        const { idUsuario, pedidos, pagamento, name, email, cpf, address } = req.body
        await db.collection("orders").insertOne({ pedidos, pagamento, idUsuario: ObjectId(idUsuario), email, name, cpf, address })
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send("Erro no servidor!")
    }
}
export async function getOrders(req, res) { 
    try {
        const { idUsuario } = req.params;
        const orders = await db.collection("orders").find({ idUsuario: ObjectId(idUsuario) }).toArray()
        res.send(orders.reverse());
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}