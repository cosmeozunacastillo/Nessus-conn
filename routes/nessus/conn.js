var https = require('https');
var express = require('express');
var router = express.Router();
var test = require('../../Files/conn2');

// 'a' is the variable that will store the token
a = '';

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

//Creating object with function of authentication, this is Global
Connection = {
  authNessus : function(){
    //THE POST Request is called!!
    test.post('https://3.8.86.49:8834/session',jsonObject,options).then(result => {
	    console.log('\n Body final: '+result.body)
	    a = JSON.parse(result.body).token;
      console.log(JSON.parse(result.body).token);
	    console.log('\n \n Si se pudo! '+ a);
    }).catch(function(err){
      console.log(err);
    });
  }
};

//We call the Authentication method every time we start the application

Connection.authNessus();

module.exports = router;
