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
    method:'get'
    },
    (error,response,body) => {
      console.log('checking token status...');
      if (body == '{"error":"Invalid Credentials"}' 
        || body == '{"error":"You need to log in to perform this request"}') {
        console.log('expired token, reconnecting... ');
        res.send(JSON.parse('{"status":"token has expired, a new one will be requested"}'));
        return validation.authNessus();
      }else{
        console.log('current token is valid');
        res.send(JSON.parse('{"status":"current token is valid"}'));
      }
    }
  );

});

module.exports = router;
