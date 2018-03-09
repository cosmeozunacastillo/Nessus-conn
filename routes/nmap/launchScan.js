var express = require('express');
var cp = require('child_process');
var router = express.Router();
var converter = require('xml2js');

var lauchScanAtConsole = function(host,callback){
    
    var nmapCmd;
    console.log(host);
    multipleIpsOrDomainsRegex = new RegExp(/^([A-Za-z0-9_\.-]+)(,([A-Za-z0-9_\.-]+))*$/);
    if (!multipleIpsOrDomainsRegex.test(host)){
        res.send(JSON.parse('{"error": "Invalid parameter."}'));
    }else{
        //nmapScanRecorder.push({"id":nmapScanRecorder.length,"status":"running"});
        //nmapCmdInternal = "nmap -p- -T4 -A -v -nP -PE -PS22,25,80 -PA21,23,80,3389 -oX \"Nmap - "+host+".xml\" --stylesheet nmap-stylesheet.xsl " +host;
        nmapCmdAutomation = "nmap -T4 -A -p 1-65535 -v -Pn -oX - "+host;
        console.log(nmapCmdAutomation);
        console.log("launching nmap scan at console...");
        var process = cp.exec(nmapCmdAutomation, (error, stdout, stderr) => {
        if(error){
            console.log("Could not run the scanner.");
        }else{
            var p = new converter.Parser();
            //console.log(stdout);
            //console.log(typeof(stdout));
            p.parseString(stdout, function (err, result) {
                console.log(result);
                console.log(typeof(result));
                var s = JSON.stringify(result,undefined,3);
                callback(s);
            });
        }

        });
        
    }
}

router.post('/', function(req, res, next) {
    var host = req.body.ips;
    req.setTimeout(0)
    lauchScanAtConsole(host,function(body){res.send(body);});
    //res.send(JSON.parse('{"status": "running"}'));

    //next();
});




    
 

module.exports = router;
