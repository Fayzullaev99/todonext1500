import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL
const options = {
    useUnifiedTopology:true,
    useNewUrlParser:true,
};

let client
let clientPromise

if (!process.env.MONGO_URL) {
    throw new Error("Check your .env file")
}

if (process.env.NODE_ENV == "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(url, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(url, options)
    clientPromise = client.connect()
}
export default clientPromise