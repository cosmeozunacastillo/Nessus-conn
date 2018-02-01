var express = require('express');
var router = express.Router();
var connection = require('../Files/conn2');
//var check = require('./conn');

router.get('/', function(req, res, next) {
  //POST DATA
  let jsonObject2 = JSON.stringify({
      uuid: 'ab4bacd2-05f6-425c-9d79-3ba3940ad1c24e51e1f403febe40',
      settings: {"emails":"",
                  "filter_type":"and",
                  "filters":[],
                  "launch_now":true,
                  "enabled":false,
                  "file_targets":"",
                  "text_targets":"0.0.0.0",
                  "policy_id":"6749",
                  "scanner_id":"1",
                  "folder_id":1,
                  "description":"test23",
                  "name":"test5"}
    });

  //CREATE SCAN HEADERS
  let postheaders = {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(jsonObject2, 'utf8'),
  		'rejectUnauthorized': false,
      'x-Cookie':  'token='+a
  };

  //CREATE OPTIONS TO CONNECT IN ORDER TO RUN A SCAN
  let options = {
  	host: '3.8.86.49',
  	port: '8834',
  	path: '/scans',
  	method: 'POST',
  	rejectUnauthorized: false,
  	headers: postheaders,
  	tryToDecode: true // Tries to decode gzip
  }

  checkConnection.checkingAuth();
  connection.post('https://3.8.86.49:8834/scans',jsonObject2,options).then(result => {
    res.send(JSON.parse(result.body));

  }).catch(function(err){
    console.log(err);
  });

});

module.exports = router;
