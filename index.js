const express = require('express');
const cors = require('cors');
require( 'dotenv' ).config()
const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );

const app = express()
const port = process.env.Port || 5000;

app.use( cors() );
app.use( express.json() );

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_USER_PASS }@demo101.q1b6emt.mongodb.net/?retryWrites=true&w=majority&appName=demo101`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

async function run() {
    try {
        await client.connect();

        const database = client.db( 'urban-master-db' );
        const cofffeCollection = database.collection( 'users' );

        app.get('/users', async ( req, res ) => {
            const cursor = cofffeCollection.find();
            const result = await cursor.toArray();
            res.send( result );
        })

        // Send a ping to confirm a successful connection
        await client.db( "admin" ).command({ ping: 1 });
        // console.log( "Pinged your deployment. You successfully connected to MongoDB!" );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

run().catch( console.dir );


app.get('/', ( req, res ) => {
    res.send( 'coffe server is running' );
})

app.listen( port, () => {
    console.log( port );
})