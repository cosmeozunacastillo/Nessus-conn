var https = require('https');
var express = require('express');
var router = express.Router();
var test = require('../Files/conn2');
// 'a' is the variable that will store the token
a = {};

// Request's body
jsonObject = JSON.stringify({
    username: 'Automation',
    password: '12345678'
});

// prepare the headers
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
		'rejectUnauthorized': false
};

// Json that contains all the options to run the scanner
let options = {
	hostname: '3.8.86.49',
	port: '8834',
	path: '/session',
	method: 'POST',
	rejectUnauthorized: false,
	headers: postheaders,
	tryToDecode: true // Tries to decode gzip
}

//THE POST Request is called!!
test.post('https://3.8.86.49:8834/session',jsonObject,options).then(result => {
	console.log('Ya lo final');
	console.log('\n Respuesta final: '+result.response)
	console.log('\n Body final: '+result.body)
	a = result.body;
	console.log('\n \n Si se pudo! '+a);
}).catch(function(err){
  console.log(err);
});

module.exports = router;
