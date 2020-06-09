//import the express library
const express = require('express');
//instantiate the express module
const app = express();

//create the server port for listening to incoming HTTP requests
//the traffic is routed from Port 80 to Port 8000 by configuring 
//Apache with a reverse proxy on requests to the /api endpoint
app.listen(8000);

//handler for incoming GET requests
app.get('/', function (req, res, next) {
  res.json({sector:"Food Retail",company:"Kroger",unique_id:1,street_address:"2641 Plymouth Rd",city:"Ann Arbor",state:"Michigan",current_occupancy:3})
})

//handler for incoming POST requests
app.post('/api',function(req,res){
	console.log(req);
	res.send('POST Request')
})
