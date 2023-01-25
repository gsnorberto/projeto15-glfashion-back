import db from "../config/database.js"
import { ObjectId } from "mongodb";

export async function addPurchase(req, res) {
    try {
        const { idProduct, name, url, size, quantity } = req.body;
        //const { idUsuario } = ;
        const idUsuario = '1' //TEMPORARY

        const updateProduct = await db.collection("purchases").findOne({idProduct, size, idUsuario})
        
        if(updateProduct) {
            await db.collection("purchases").updateOne({ idProduct, size, idUsuario}, { $set: {quantity: parseInt(updateProduct.quantity) + parseInt(quantity) } });
            return res.sendStatus(201);
        }
        
        await db.collection("purchases").insertOne({ idProduct, name, url, size, quantity, idUsuario});
        res.sendStatus(201);
    } catch (error) {
      res.status(500).send("Erro no servidor!");
    }
}

export async function getPurchases(req, res) {
    try {
        //const { idUsuario } = ;
        const idUsuario = '1' //TEMPORARY
        const purchases = await db.collection("purchases").find({idUsuario}).toArray();
        res.send(purchases);
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}

export async function putPurchases(req, res) {
    try {
        const { idPurchase, quantity } = req.body;
        await db.collection("purchases").updateOne({ _id: ObjectId(idPurchase) }, { $set: {quantity} });
            return res.sendStatus(204);
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}

export async function deletePurchases(req, res) {
    try {
        const { idPurchase } = req.body;
        await db.collection("purchases").deleteOne({_id: ObjectId(idPurchase)});
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}