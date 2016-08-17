var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded( {extended: false});

app.use(express.static('public'));

var cities = {
	'Lotopia' : 'some descrioption',
	'Caspiana' : 'description',
	'Indigo' : 'descript bla'
};

app.get('/cities', function(request, response){
	response.json( Object.keys(cities));
});

app.post('/cities', urlencode, function(request, response){
	var newCity = request.body;
	cities[newCity.name] = newCity.description;
	response.status(201).json(newCity.name);
});

// app.listen(3000, function(){
// 	console.log('Listening on port 3000');
// });
module.exports = app;