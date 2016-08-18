var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded( {extended: false});

app.use(express.static('public'));

//Redis connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {

    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);

} else {
	
	var client = redis.createClient();
}

client.select((process.env.NODE_ENV || 'development').length);

//End Redis Connection

// client.hset('cities', 	'Lotopia' , 'some descrioption');
// client.hset('cities', 	'Caspiana' , 'description');
// client.hset('cities', 	'Indigo' , 'descript bla');


app.get('/cities', function(request, response){
	client.hkeys('cities', function(error, names){
		response.json(names);	
	});
});

app.post('/cities', urlencode, function(request, response){
	var newCity = request.body;

	client.hset('cities', newCity.name, newCity.description, function(error){
		if(error) throw error;
		response.status(201).json(newCity.name);
	});
	
});

// app.listen(3000, function(){
// 	console.log('Listening on port 3000');
// });
module.exports = app;