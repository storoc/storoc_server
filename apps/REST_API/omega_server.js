//import the express library
const express = require('express');
//instantiate the express module
const app = express();
//import mongo
const { MongoClient } = require('mongodb');
//define local server endpoint for MongoDB collection
const db_url = "mongodb://localhost:27017/stores";
//instantiate mongo client
const client = new MongoClient(db_url);

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//create the server port for listening to incoming HTTP requests
//the traffic is routed from Port 80 to Port 8000 by configuring
//Apache with a reverse proxy on requests to the /api endpoint
app.listen(8000);

//define a static endpoint for connecting to the db
app.use('/storoc', express.static('/storoc_db'));

//specify to use JSON parser for express, limit requests to
//1MB for general server performance
app.use(express.json({ limit: '1mb' }));

//handler for incoming POST requests
app.post('/', function (req, res, next) {

	setStoreOcc(req.body.unique_id, req.body.current_occupancy);
	res.send('OK');
})

//handler for incoming POST requests
app.post('/store_management', function (req, res, next) {

	setStoreSettings(req.body.unique_id, req.body.max_occupancy, req.body.comments);
	res.send('OK');
})

//handler for incoming GET requests
app.get('/',function(req,res){

   	//determine desired store ID
   	const store_id = req.query.unique_id;

   	//get store info for given store ID
   	storeInfo = getStoreInfo(store_id);

	//when async function resolves, update value
	storeInfo.then((value) => {
  		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.jsonp(value);
	});
})

async function getStoreInfo(storeID) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to re$
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://127.0.0.1:27017/stores";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html $
     */
    const client = new MongoClient(uri);

    var store = new Object();
        store.unique_id = storeID;

	console.log(store);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Find associated data for the given store ID
        store_data = await client.db("stores").collection("stores").findOne(store);
    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
	console.log(store_data);
	return store_data;
    }
}

async function setStoreOcc(storeID, current_occupancy) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to re$
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://127.0.0.1:27017/stores";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html $
     */
    const client = new MongoClient(uri);

    var store = new Object();
	store.unique_id = storeID;

    var occupancy = new Object();
	occupancy.current_occupancy = current_occupancy;

    console.log(store);
    console.log(occupancy);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Find associated data for the given store ID
        store_data = await client.db("stores").collection("stores").updateOne(store, {$set: occupancy});
    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}


async function setStoreSettings(storeID, max_occupancy, comments) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to re$
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://127.0.0.1:27017/stores";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html $
     */
    const client = new MongoClient(uri);

    var store = new Object();
    store.unique_id = storeID;

    var comments = new Object();
	comments.comments = comments;

    var max_occupancy = new Object();
    max_occupancy.max_occupancy = max_occupancy;


    console.log(store);
    console.log(max_occupancy);
    console.log(comments);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Find associated data for the given store ID
        store_data = await client.db("stores").collection("stores").updateOne(store, {$set: max_occupancy});
    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}
