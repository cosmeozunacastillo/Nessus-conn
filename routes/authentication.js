var express = require('express');
var router = express.Router();
var connection = require('../Files/conn2');


router.get('/', function(req, res, next) {
    //GET TOKEN, THIS WILL BE VISIBLE AND NEEDED BY ALMOST ALL THE FILES
    //test
    con = ''; // WHERE THE TOKEN WILL BE STORED
    console.log('Authenticating...');
    //"a" VARIABLE IS DEFINED IN "conn2" FILE
    for (var i = 10; i < a.length-2; i++) {
        con += a[i];
    }
    console.log('Your token is: '+con);
});

module.exports = router;