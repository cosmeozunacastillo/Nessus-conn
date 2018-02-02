var express = require('express');
var router = express.Router();
var connection = require('../../Files/conn2');

router.get('/', function(req, res, next) {
    var scan = req.query.scan;
    var regex = new RegExp("^[0-9]+$");
    console.log(regex.exec(scan));
    if(regex.exec(scan)!=null){
        let postheaders = {
            'rejectUnauthorized': false,
            'x-Cookie':  'token='+ a,
            //'Host': '3.8.86.49:8834'
        };
        let options = {
            host: '3.8.86.49',
            port: '8834',
            path: '/scans/'+scan,
            method: 'GET',
            rejectUnauthorized: false,
            headers: postheaders,
            tryToDecode: true 
        }
        connection.get('https://3.8.86.49:8834/scans/'+scan,options).then(
            result => {
                res.send(JSON.parse(result.body));
            }).catch(function(err){
                console.log(err);
            });
    }else{
        res.send(JSON.parse('{"error":"invalid parameter."}'));
    }

});

module.exports = router;