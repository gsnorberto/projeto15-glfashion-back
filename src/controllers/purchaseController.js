import db from "../config/database.js"
import { ObjectId } from "mongodb";

export async function addPurchase(req, res) { 
    try {
        const { idUsuario, idProduct, size, quantity } = req.body;
        
        const product = await db.collection("products").findOne({ _id: ObjectId(idProduct) })
        if(!product) return res.send("Produto não existe!")

        const updateProduct = await db.collection("purchases").findOne({ idProduct: ObjectId(idProduct), size, idUsuario: ObjectId(idUsuario) })
        
        if (updateProduct) {
            await db.collection("purchases").updateOne({ idProduct: ObjectId(idProduct), size, idUsuario: ObjectId(idUsuario) }, { $set: { quantity: parseInt(updateProduct.quantity) + parseInt(quantity), totalValue: product.value*(parseInt(updateProduct.quantity) + parseInt(quantity)) } });
            return res.sendStatus(201);
        }

        await db.collection("purchases").insertOne({ idProduct: ObjectId(idProduct), name: product.name, url: product.url, size, quantity: parseInt(quantity), totalValue: product.value*parseInt(quantity),  idUsuario: ObjectId(idUsuario) });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send("Erro no servidor!");
    }
}

export async function getPurchases(req, res) {
    try {
        const { idUsuario } = req.params;
        const purchases = await db.collection("purchases").find({ idUsuario: ObjectId(idUsuario) }).toArray()
        res.send(purchases);
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}

export async function putPurchases(req, res) {
    try {
        const { idPurchase, quantity, idProduct } = req.body;
        const product = await db.collection("products").findOne({ _id: ObjectId(idProduct) })
        await db.collection("purchases").updateOne({ _id: ObjectId(idPurchase) }, { $set: { quantity, totalValue:  product.value*quantity} })
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}

export async function deletePurchases(req, res) {
    try {
        const { idPurchase } = req.body;
        await db.collection("purchases").deleteOne({ _id: ObjectId(idPurchase) });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}