var express = require('express');
var router = express.Router();
var connection = require('../Files/conn2');
var watch = require('node-watch');
aa = {};

scannerInfo = {
    "id": null,
    "status":null,
};
router.get('/', function(req, res, next) {
    //CREATING FOLDER ID
    folder = 13628;
    //CREATE SCAN HEADERS
    let postheaders = {
        //'Content-Type' : 'application/json',
        //'Content-Length' : Buffer.byteLength(jsonObject2, 'utf8'),
        'rejectUnauthorized': false,
        'x-Cookie':  'token='+ a,
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
          console.log(JSON.parse(aa).scans);
          //res.send('This is the response: ' + aa);
          //res.send(JSON.parse(result.body).scans[0]);
    }).catch(function(err){
    console.log(err);
    });
    while(scannerInfo.status!="completed"){
        
        connection.get('https://3.8.86.49:8834/scans?folder_id='+folder,options).then(
        result => {
            //console.log("hola");
            aa = JSON.parse(result.body).scans;
            //console.log(aa.length);
            entire_loop:
            for(var i=0; i<aa.length; i++){
                for(var key in aa[i]){
                    //alert(aa[i][key]);
                    console.log("This is the key: "+key+" and this is the value of the key: "+aa[i][key]);
                    if(key=='id' && aa[i][key]==scannerInfo.id){
                        
                        scannerInfo.status = aa[i];
                        break entire_loop;
                    }
                }
            }

        }).catch(function(err){
        console.log(err);
        });
    }
    console.log("scanner completed!");
    //res.send('This is the response: ' + aa);
});

module.exports = router;
