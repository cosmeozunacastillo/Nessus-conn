var express = require('express');
var router = express.Router();
var connection = require('../../Files/conn2');

asssessmentId = 0;
router.get('/', function(req, res, next) {
    var assessment = req.query.assessment;
    var regex = new RegExp("^[0-9]+$");
    console.log(regex.exec(assessment));
    if(regex.exec(assessment)!=null){
        let postheaders = {
            'rejectUnauthorized': false,
            'x-Cookie':  'token='+ a,
            //'Host': '3.8.86.49:8834'
        };

        let options = {
            host: '3.8.86.49',
            port: '8834',
            //path: '/scans/'+scan,
            method: 'GET',
            rejectUnauthorized: false,
            headers: postheaders,
            tryToDecode: true 
        }
        //connection.get('https://3.8.86.49:8834/scans/'+scan,options).then(
    
    connection.get('https://3.8.86.49:8834/scans/',options).then(
            result => {
                let allScans = JSON.parse(result.body);
                //console.log(allScans.scans.length);
                entire_loop:
                for(var i=0; i<allScans.scans.length; i++){
                    //console.log(allScans.scans[i]);
                    for(var key in allScans.scans[i]){
                        
                        if(key=='name' && allScans.scans[i][key]==assessment){
                            asssessmentId = allScans.scans[i].id;
                            //console.log(asssessmentId);
                            break entire_loop;
                            next();
                        }
                    }
                }
                //res.send(allScans);
            }).catch(function(err){
                console.log(err);
            }
    );
    console.log(asssessmentId);
    connection.get('https://3.8.86.49:8834/scans/'+asssessmentId,options).then(
        result => {
            res.send(JSON.parse(result.body));
        }).catch(function(err){
                console.log(err);
        }
    );

    }else{
        res.send(JSON.parse('{"error":"invalid parameter."}'));
    }

});

module.exports = router;