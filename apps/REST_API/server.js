//import the express library
const express = require('express');
//instantiate the express module
const app = express();

//create the server port for listening to incoming HTTP requests
//the traffic is routed from Port 80 to Port 8000 by configuring 
//Apache with a reverse proxy on requests to the /api endpoint
app.listen(8000);

//handler for incoming GET requests
app.get('/', function(req, res) {
	res.send('It works');
});

//handler for incoming POST requests
app.post('/api',function(req,res){
	console.log(req);
	res.send('POST request to the homepage')
})
