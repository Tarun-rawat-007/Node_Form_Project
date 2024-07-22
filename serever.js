const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017/"; // Replace with your MongoDB connection string

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/submit', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('exampleDB');
        const collection = database.collection('exampleCollection');

        const data = { name: req.body.name, age: req.body.age };
        await collection.insertOne(data);

        res.json({ message: 'Data successfully saved!' });

    } catch (e) {
        console.error(e);
        res.json({ message: 'An error occurred while saving data.' });

    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
