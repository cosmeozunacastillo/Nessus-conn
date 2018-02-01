var https = require('https');
var express = require('express');
var router = express.Router();
var test = require('../Files/conn2');
// 'a' is the variable that will store the token
a = '';
statusCodeToken = '';
statusBody = '';
aux = false;

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
var options = {
  host: '3.8.86.49',
  port: '8834',
  path: '/session',
  method: 'POST',
  rejectUnauthorized: false,
  headers: postheaders,
  tryToDecode: true // Tries to decode gzip
}

//Funciton to login nessus
function authNessus(){
  console.log('Logging into Nessus!');

  //THE POST Request is called!!
  test.post('https://3.8.86.49:8834/session',jsonObject,options).then(result => {
  	console.log('\n Body final: '+result.body);
    //statusCodeToken = result.statusCode;
    a = JSON.parse(result.body).token;
    console.log(JSON.parse(result.body).token);
  	console.log('\n \n Si se pudo! '+ a);
    console.log('Authentication completed');
  }).catch(function(err){
    console.log(err);
  });
}


var getHeaders = {
    //'Content-Type' : 'application/json',
    'Content-Length' : 0,
    'rejectUnauthorized': false,
    'x-Cookie':  'token='+ a,
    'host': '3.8.86.49:8834'
};

// Json that contains all the options to run the scanner
var optionsCheck = {
  host: '3.8.86.49',
  port: '8834',
  path: '/session',
  method: 'GET',
  rejectUnauthorized: false,
  headers: getHeaders,
  tryToDecode: true // Tries to decode gzip
}


//Creating function in order to check if the nessus Token is valid
checkConnection = {
    checkingAuth: function(){
      console.log('Checking the status of the Token' );

      test.get('https://3.8.86.49:8834/session',optionsCheck).then(result => {
        //CHECKING RESPONSE HEADERS
        statusCodeToken = result.statusCode;
        statusBody = JSON.parse(result.body);
        console.log(statusBody + result.headers);
        console.log('Que trae el body:   '+ result.body+'\n' + 'statusCode: '+ result.statusCode + '\n');

        //if (result.body == '{"error":"Invalid Credentials"}' || result.body == '{"error":"You need to log in to perform this request"}') {
        if (result.body == '{"error":"Invalid Credentials"}') {
          console.log('Something were wrong... Connecting again. ');
          return authNessus();
        }else{
          console.log('Everything is ok');
        }
      }).catch(function(err){
        console.log(err);
      });
    }
  };

/*check = {
    checkingAuth: function(statusCode){
      console.log('Checking the status Code of the rquest, \n The Nessus response status code is: '+statusCode);
      if ( statusCode != '200'){
        console.log('Something wrong with the token has happend... Connecting again. ');
        return authNessus();
      }else{
        console.log('Everything is ok');
      }
    }
  };
*/
//The authNessus function is called
  authNessus();
  //isLogged(statusCodeToken);

module.exports = router;
