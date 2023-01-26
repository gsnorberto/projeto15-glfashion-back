import db from '../config/database.js';

export async function addProduct(req, res) {

}

export async function getProducts(req, res) {
  try {
    const products = await db.collection('products').find().toArray();

	  res.send(products);
  } catch (err) {
    res.status(500).send('Erro no sevidor')
  }
}

export async function getProduct(req, res) {

}
