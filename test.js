var request = require('supertest');
var app = require('./app');

request(app)
	.get('/')
	.expect(200)
	.end(function(err) {
		if(err) throw err;
		console.log('Done');
	});