var express = require('express');
var router = express.Router();
var test = require('../../Files/conn2');
//This API is for validate the token every time we need.
//In case the token is expired, we call the authentication method again.

router.get('/', function(req, res, next) {
  //Assignin headers
  getHeaders = {
      //'Content-Type' : 'application/json',
      'Content-Length' : 0,
      'rejectUnauthorized': false,
      'X-Cookie':  'token='+ a,
      'host': '3.8.86.49:8834'
  };
  // Json that contains all the options to run the scanner
  optionsCheck = {
    host: '3.8.86.49',
    port: '8834',
    path: '/session',
    method: 'GET',
    rejectUnauthorized: false,
    headers: getHeaders,
    tryToDecode: true // Tries to decode gzip
  }

  console.log('Checking the status of the Token');
  test.get('https://3.8.86.49:8834/session',optionsCheck).then(result => {
    //CHECKING RESPONSE HEADERS
    statusCodeToken = result.statusCode;
    statusBody = JSON.parse(result.body);
    console.log('Body: \n  '+ result.body+'\n' + 'statusCode: '+ result.statusCode + '\n');
    if (result.body == '{"error":"Invalid Credentials"}' || result.body == '{"error":"You need to log in to perform this request"}') {
      console.log('Something were wrong... Connecting again. ');
      res.send('Invalid Token, Reconnecting');
      return Connection.authNessus();
    }else{
      console.log('Everything is ok');
      res.send('Token Valid');
    }
  }).catch(function(err){
    console.log(err);
  });
});

module.exports = router;
