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
    //console.log("2nd request body:"+req.query);console.log(req);
    request.get({
        url:'https://3.8.86.49:8834/scans/'+asssessmentId,
        headers: {
            'rejectUnauthorized': false,
            'X-Cookie':  'token='+ a},
        method:'GET',
        rejectUnauthorized: false
        },(error,response,body) => {
            let scanDetails = {};
            scanDetatils = JSON.parse(body);
            historyId = (scanDetatils.history)?scanDetatils.history[0].history_id:-1;
            //console.log(historyId);
            //console.log("making second request");
            next();
            //res.send(JSON.parse(body));
        });
});

router.get('/', function(req, res, next) {
    //console.log("3rd request body:"+req.body);
    request.post({
        url:'https://3.8.86.49:8834/scans/'+asssessmentId+'/export?history_id='+historyId,
        headers: {
            'Content-Type' : 'application/json',
            'rejectUnauthorized': false,
            'X-Cookie':  'token='+ a},
        body: JSON.stringify({'format':'nessus'}),
        rejectUnauthorized: false
        },(error,response,body) => {
            //console.log(urlExport);
            //console.log("making second request");
            fileId = JSON.parse(body).file;
            next();
        });
});

router.get('/', function(req, res, next) {
    //console.log("4th request body:"+req.body);
    urlExport = 'https://3.8.86.49:8834/scans/'+asssessmentId+'/export/'+fileId+'/download';
    request.get({
        url:urlExport,
        headers: {
            'rejectUnauthorized': false,
            'X-Cookie':  'token='+ a,
            'Content-Type' : 'application/json'
        },
        rejectUnauthorized: false
        },(error,response,body) => {
            var converter = require('xml2js');
            var p = new converter.Parser();


            p.parseString(body, function (err, result) {
                var s = JSON.stringify(result,undefined,3);
                var t = JSON.parse(s);
                //console.log('Result: \n' + s + '\n');
                //res.send(s);
                let untranslatedVulnerabilities = {
                    'assessment':(t)?t.NessusClientData_v2.Report[0].$.name:-1,
                    'scanId':asssessmentId,
                    'policy':(t)?t.NessusClientData_v2.Policy:-1,
                    'hosts':[]
                };
                for(var i=0; i<t.NessusClientData_v2.Report[0].ReportHost.length; i++){
                    //console.log(t.NessusClientData_v2.Report[0].ReportHost[i]);
                    untranslatedVulnerabilities.hosts.push(t.NessusClientData_v2.Report[0].ReportHost[i]);
                }
                //console.log(untranslatedVulnerabilities);
                //res.send(s);
                res.send(untranslatedVulnerabilities);
            });
            //console.log(urlExport);
            //console.log("making second request");
            //next();
            //res.send(body);
    });
})

module.exports = router;