var express = require('express');
var router = express.Router();
var connection = require('../Files/conn2');

/* GET users listing. */

router.get('/', function(req, res, next) {
  //OBTAIN token
  con = '';
  console.log('Entra');
  for (var i = 10; i < a.length-2; i++) {
    con += a[i];
  }

  //POST DATA
  console.log('\n Token' + a.token);
  jsonObject2 = JSON.stringify({
      uuid: 'ab4bacd2-05f6-425c-9d79-3ba3940ad1c24e51e1f403febe40',
      settings: {"emails":"","filter_type":"and","filters":[],"launch_now":true,"enabled":false,"file_targets":"","text_targets":"3.211.65.171","policy_id":"6749","scanner_id":"1","folder_id":13628,"description":"test2","name":"test2"}
    });
    console.log('x-cookie: ' +con);

  //CREATE SCAN HEADERS
  let postheaders = {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(jsonObject2, 'utf8'),
  		'rejectUnauthorized': false,
      'x-Cookie':  'token='+con
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
  	console.log('Ya lo final');
  	console.log('\n Respuesta final: '+result.response)
  	console.log('\n Body final: '+result.body)
  	a = result.body;
    //console.log(a.token);
  	console.log('\n \n Si se pudo! '+a);
  }).catch(function(err){
    console.log(err);
  });

  res.send('Aqui esta solo el token: ' + con);
});
/*
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
		'rejectUnauthorized': false,
    'X-Cookie:':  con
};

console.log('token ya para usarse: ' + con);

*/
module.exports = router;
