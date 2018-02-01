var express = require('express');
var router = express.Router();
var connection = require('../Files/conn2');
var watch = require('node-watch');
aa = {};

router.get('/', function(req, res, next) {

    var folder = (typeof(req.query.folder) == 'undefined'|| req.query.folder=='')?13628:req.query.folder;
    //console.log(folder);
    var scan = req.query.scan;
    //console.log(scan);

    let postheaders = {
        //'Content-Type' : 'application/json',
        //'Content-Length' : Buffer.byteLength(jsonObject2, 'utf8'),
        'rejectUnauthorized': false,
        'x-Cookie':  'token='+ a,
        //'Host': '3.8.86.49:8834'
    };

    let options = {
        host: '3.8.86.49',
        port: '8834',
        path: '/scans?folder_id='+folder,
        method: 'GET',
        rejectUnauthorized: false,
        headers: postheaders,
        tryToDecode: true 
    }

    connection.get('https://3.8.86.49:8834/scans?folder_id='+folder,options).then(
        result => {
            aa = JSON.parse(result.body).scans;
            //console.log(aa);
            var response = {};
            var wasScanFound = false;
            
            if(aa != null){
                if(typeof(scan)=='undefined' || scan==''){
                    res.send(aa);
                }else{

                    for (var i = 0; i < aa.length; i++) {
                        if (aa[i].id == scan){
                            res.send(aa[i]);
                            wasScanFound = true;
                            console.log(typeof(aa[i]));
                            break;
                        }
                    }
                    if(!wasScanFound)
                        res.send(JSON.parse('{"error":"provided scan was not found."}'));
                }
            }else{
                res.send(JSON.parse('{"error":["folder was not found","credentials are not valid","sesion has expired"]}'));
            }
    }).catch(function(err){
    console.log(err);
    });

});

module.exports = router;
