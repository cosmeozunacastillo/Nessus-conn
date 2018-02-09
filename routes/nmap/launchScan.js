var express = require('express');
var cp = require('child_process');
var router = express.Router();

var lauchScanAtConsole = function(host){
    
    var nmapCmd;
    console.log(host);
    hostRegex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    if (!hostRegex.test(host)){
        res.send(JSON.parse('{"error": "Invalid parameter."}'));
    }else{
        //nmapScanRecorder.push({"id":nmapScanRecorder.length,"status":"running"});
        nmapCmdInternal = "nmap -p 1-65535 -T4 -A -v -PE -PS22,25,80 -PA21,23,80,3389 -oX \"Nmap - "+host+".xml\" --stylesheet nmap-stylesheet.xsl " +host;
        console.log(nmapCmdInternal);
        //nmapCmdExternal = nmap -p 1-65535 -T4 -A -v -Pn -oX "Nmap - %%a.xml" --stylesheet nmap-stylesheet.xsl %%a;
        nmapCmd = "nmap -oX "+ host + ".xml --stylesheet "+host+".xsl -oN "+host+".nmap -T4 -F "+ host;
        console.log("launching nmap scan at console...");
        //result;
        var process = cp.exec(nmapCmdInternal, (error, stdout, stderr) => {
        //result = stdout;
        if(error){
            //callback(JSON.parse('{"error": "Could not run the scanner."}'));
            console.log("Could not run the scanner.");
            //res.send(JSON.parse('{"error": "Could not run the scanner."}'));
        }else{
            //callback(result);
            console.log(stdout);
            console.log(typeof(stdout));
        }

        });
        
    }
}

router.post('/', function(req, res, next) {
    var host = req.body.ips;
    lauchScanAtConsole(host);
    res.send(JSON.parse('{"status": "running"}'));
    //next();
});




    
 

module.exports = router;
