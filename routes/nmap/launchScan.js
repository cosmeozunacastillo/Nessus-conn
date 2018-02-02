var express = require('express');
var cp = require('child_process');
var router = express.Router();
var scanRecorder = require('./scanRecorder');

router.get('/', function(req, res, next) {
    var host = scannerIp;
    var hostRegex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    console.log(nmapScanRecorder);

    if (!hostRegex.test(host)){
        res.render('error', {
            message: 'Invalid parameter.',
            error: {}
        });
    }else{
        nmapScanRecorder.push({"id":nmapScanRecorder.length,"status":"running"});
        var process = cp.exec("nmap -oX " + host + ".xml --stylesheet " + host + ".xsl -oN " + host+".nmap -T4 -F "+ host, (error, stdout, stderr) => {
            if(error){
                res.render('error', {
                    message: 'Could not run the scanner.',
                    error: {}
                });
            }else{
                console.log(stdout);
                res.send(stdout);
            }
        });
    }
});
module.exports = router;