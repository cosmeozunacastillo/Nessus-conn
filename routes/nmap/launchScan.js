var express = require('express');
var cp = require('child_process');
var router = express.Router();

router.get('/', function(req, res, next) {
    var host = assessmentInfo.ips;
    console.log(host);
    hostRegex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    if (!hostRegex.test(host)){
        res.send(JSON.parse({'error': 'Invalid parameter.'}));
    }else{
        //nmapScanRecorder.push({"id":nmapScanRecorder.length,"status":"running"});
        var process = cp.exec("nmap -oX " + host + ".xml --stylesheet " + host + ".xsl -oN " + host+".nmap -T4 -F "+ host, (error, stdout, stderr) => {
            if(error){
                res.send(JSON.parse({'error': 'Could not run the scanner.'}));
            }else{
                console.log(stdout);
                res.send(stdout);
            }
        });
    }
});
module.exports = router;
