var express = require('express');
var router = express.Router();
var connection = require('../../Files/conn2');

router.get('/', function(req, res, next) {
  //POST DATA
  console.log('\n Token' + a.token);
  let jsonObject2 = JSON.stringify({
      "uuid": 'ab4bacd2-05f6-425c-9d79-3ba3940ad1c24e51e1f403febe40',
      "settings": {"emails":"",
      "filter_type":"and",
      "filters":[],
      "launch_now":true,
      "enabled":false,
      "file_targets":"",
      "text_targets":ScannerIP,
      "policy_id":"6749",
      "scanner_id":"1",
      "folder_id":2,
      "description":ScannerName,
      "name":ScannerName}
    });
    console.log('x-cookie: ' +a);

  //CREATE SCAN HEADERS
  let postheaders = {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(jsonObject2, 'utf8'),
  		'rejectUnauthorized': false,
      'x-Cookie':  'token='+a
  };

  //CREATE OPTIONS TO CONNECT IN ORDER TO RUN A SCAN
  let options = {
  	hostname: '3.8.86.49',
  	port: '8834',
  	path: '/scans',
  	method: 'POST',
  	rejectUnauthorized: false,
  	headers: postheaders,
  	tryToDecode: true // Tries to decode gzip
  }

  connection.post('https://3.8.86.49:8834/scans',jsonObject2,options).then(result => {
    res.send(JSON.parse(result.body));

  }).catch(function(err){
    console.log(err);
  });

});
module.exports = router;
