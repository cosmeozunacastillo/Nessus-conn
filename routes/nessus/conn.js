var https = require('https');
var express = require('express');
var router = express.Router();
var request = require('request');

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
validation = {
  authNessus : function(){
    //THE POST Request is called!!
    console.log('authenticating nessus...');
    request.post({
      headers: postheaders,
      url: 'https://3.8.86.49:8834/session',
      body: jsonObject,
      method: 'POST',
      rejectUnauthorized: false
      },function(error,response,body){
        console.log("authenticated: "+body);
        a = JSON.parse(body).token;
      }
    );
  }
};

//We call the Authentication method every time we start the application

validation.authNessus();

module.exports = router;
