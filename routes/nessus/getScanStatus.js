var express = require('express');
var router = express.Router();
var request = require('request');

aa = {};

router.get('/', function(req, res, next) {
    var folder = (typeof(req.query.folder) == 'undefined'|| req.query.folder=='')?13628:req.query.folder;
    var assessment = req.query.assessment;

    request.get({ 
        url:'https://3.8.86.49:8834/scans?folder_id='+folder,
        headers: {
            'rejectUnauthorized': false,
            'X-Cookie':  'token='+ a
        },
        rejectUnauthorized: false
    },(error,response,body) => {
        aa = JSON.parse(body).scans;
            //console.log(aa);
        var wasScanFound = false;
            
        if(aa != null){
            if(typeof(assessment)=='undefined' || assessment==''){
                res.send(aa);
            }else{
                //console.log(aa);
                for (var i = 0; i < aa.length; i++) {
                    if (aa[i].name == assessment){
                        res.send(aa[i]);
                        wasScanFound = true;
                        //console.log(typeof(aa[i]));
                        break;
                    }
                }
                if(!wasScanFound)
                    res.send(JSON.parse('{"error":"provided scan was not found."}'));
            }
        }else{
            res.send(JSON.parse('{"error":["folder was not found","credentials are not valid","sesion has expired"]}'));
        }
    });

});

module.exports = router;
