var express = require('express');
var router = express.Router();
var request = require('request');

asssessmentId = 0;

router.get('/', function(req, res, next) {
    var assessment = req.query.assessment;
    var folder = (typeof(req.query.folder) == 'undefined'|| req.query.folder=='')?13628:req.query.folder;
    var regex = new RegExp("^[0-9]+$");
    //console.log(regex.exec(assessment));
    if(regex.exec(assessment)!=null){
        request.get({
            headers: {
                'rejectUnauthorized': false,
                //'X-Cookie':  'token='},
                'X-Cookie':  'token='+ a},
            url: 'https://3.8.86.49:8834/scans?folder_id='+folder,
            method: 'GET',
            rejectUnauthorized: false
            },
            (error,response,body) => {
                //console.log(body);
                switch(true){
                    case error!=null://.code =='ECONNREFUSED':
                        console.log('connection error: '+error.code);
                        var connError = {"error":"connection error","code":error.code};
                        res.send(connError);
                    break;
                    case JSON.parse(body).error!=null && JSON.parse(body).error!='undefined':
                        res.send(JSON.parse(body));
                    break;
                    default:
                        let allScans = {};
                        allScans = JSON.parse(body);
                        asssessmentId = 0;
                        //console.log(a);
                        //console.log(allScans);
                        //console.log("making first request");
                        //console.log(allScans);
                        entire_loop:
                        for(var i=0; i<allScans.scans.length; i++){
                            //console.log(allScans[i]);
                            for(var key in allScans.scans[i]){
                                
                                if(key=='name' && allScans.scans[i][key]==assessment){
                                    asssessmentId = allScans.scans[i].id;
                                    //console.log((asssessmentId==0)?"1 was not found": "1 assessment found: " + asssessmentId);
                                    break entire_loop;
                                }
                            }
                        }
                        next();
                    break;
                }
            }
        );
    }else{
        res.send(JSON.parse('{"error":"invalid parameter."}'));
    }
});

router.get('/', function(req, res, next) {
    request.get({
        url:'https://3.8.86.49:8834/scans/'+asssessmentId,
        headers: {
            'rejectUnauthorized': false,
            'X-Cookie':  'token='+ a},
        method:'GET',
        rejectUnauthorized: false
        },(error,response,body) => {
            //console.log("making second request");
            res.send(JSON.parse(body));
        });
});

module.exports = router;