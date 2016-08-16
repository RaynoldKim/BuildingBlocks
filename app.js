var express = require('express');
var app = express();


app.use(express.static('public'));


app.get('/cities', function(request, response){
	var cities = ['Lotopia', 'Caspiana', 'Indigo'];
	response.json(cities);
});

// app.listen(3000, function(){
// 	console.log('Listening on port 3000');
// });
module.exports = app;