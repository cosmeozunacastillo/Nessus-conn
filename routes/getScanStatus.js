var express = require('express');
var router = express.Router();
var connection = require('../Files/conn2');
aa = {};

router.get('/', function(req, res, next) {
    //CREATING FOLDER ID
    folder = 13628;
    //CREATE SCAN HEADERS
    let postheaders = {
        //'Content-Type' : 'application/json',
        //'Content-Length' : Buffer.byteLength(jsonObject2, 'utf8'),
        'rejectUnauthorized': false,
        'x-Cookie':  'token='+con,
        //'Host': '3.8.86.49:8834'
    };
  //CREATE OPTIONS TO REQUEST STATUS
    let options = {
        host: '3.8.86.49',
        port: '8834',
        path: '/scans?folder_id='+folder,
        method: 'GET',
        rejectUnauthorized: false,
        headers: postheaders,
        tryToDecode: true // Tries to decode gzip
    }
    connection.get('https://3.8.86.49:8834/scans?folder_id='+folder,options).then(
        result => {
          aa = result.body;
          //console.log(typeof(JSON.parse(result.body)));
          console.log(JSON.parse(result.body).folders);
          res.send('This is the response: ' + aa);
    }).catch(function(err){
    console.log(err);
    });
    //res.send('This is the response: ' + aa);
});

module.exports = router;
