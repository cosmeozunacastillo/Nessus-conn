var express = require('express');
var router = express.Router();
var request = require('request');
//This API is for validate the token every time we need.
//In case the token is expired, we call the authentication method again.

router.get('/', function(req, res, next) {
  request.get({
    headers: {
      'X-Cookie':  'token='+ a,
      'rejectUnauthorized': false
    },
    url: 'https://3.8.86.49:8834/session',
    method:'GET',
    rejectUnauthorized: false
    },
    (error,response,body) => {
      console.log('checking token status...');

      switch(true){
        case error!=null:
          console.log('connection error: '+error.code);
          var connError = {"error":"connection error","code":error.code};
          res.send(connError);
        break;
        case JSON.parse(body).error!=null:
          console.log('invalid token, reconnecting... ');
          res.send(JSON.parse('{"status":"invalid","message": "a new one will be requested"}'));
          return validation.authNessus();
        break;
        default:
        console.log('current token is valid');
        res.send(JSON.parse('{"status":"valid","message":"current token is valid","token":"'+a+'"}'));
        break;
      }
    }
  );

});

module.exports = router;
