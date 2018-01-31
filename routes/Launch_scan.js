var express = require('express');
var router = express.Router();
var connection = require('../Files/conn2');

<<<<<<< HEAD

=======
>>>>>>> a0193c9683ad5d59c60f1ac6bd9bca168da40429
/* GET users listing. */

router.get('/', function(req, res, next) {
  //"authentication" file needs to be called first to make this file works
  //test
  //POST DATA
  console.log('\n Token' + a.token);
  let jsonObject2 = JSON.stringify({
      uuid: 'ab4bacd2-05f6-425c-9d79-3ba3940ad1c24e51e1f403febe40',
<<<<<<< HEAD
      settings: {"emails":"",
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
=======
      settings: {"emails":"","filter_type":"and","filters":[],"launch_now":true,"enabled":false,"file_targets":"","text_targets":"3.211.65.171","policy_id":"6749","scanner_id":"1","folder_id":2,"description":"test23","name":"test2"}
    });
    console.log('x-cookie: ' +con);
>>>>>>> a0193c9683ad5d59c60f1ac6bd9bca168da40429

  //CREATE SCAN HEADERS
  let postheaders = {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(jsonObject2, 'utf8'),
  		'rejectUnauthorized': false,
<<<<<<< HEAD
      'x-Cookie':  'token='+a
=======
      'x-Cookie':  'token='+con
>>>>>>> a0193c9683ad5d59c60f1ac6bd9bca168da40429
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
  	console.log('\n Body cuando pone a correr el scanner : '+result.body);
    console.log('\n Tamaño del JSON Body : '+result.body.length);
  }).catch(function(err){
    console.log(err);
  });

<<<<<<< HEAD
  res.send('Aqui esta solo el token: ' + a);
=======
  res.send('Aqui esta solo el token: ' + con);
>>>>>>> a0193c9683ad5d59c60f1ac6bd9bca168da40429
});

module.exports = router;
