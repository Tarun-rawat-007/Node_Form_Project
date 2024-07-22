const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/"; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Create a new database and collection
        const database = client.db('exampleDB');
        const collection = database.collection('exampleCollection');

        console.log("Connected to the database and created collection!");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
