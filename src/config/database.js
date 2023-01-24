import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

// MongoDB Connection
const mongoClient = new MongoClient(process.env.DATABASE_URL)

let db;

try {
    await mongoClient.connect()
    db = mongoClient.db()
    console.log(`Conexão estabelecida com o MongoDB`)
} catch (error) {
    console.log(error.message);
}

export default db