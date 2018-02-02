var express = require('express');
var router = express.Router();
scannerIp = {};
scannerName ={};

jsonData={
    status: '',
    requestNum: '999999999',
    appName: 'automationTest',
    isInternetFacing: 'No',
    isExportControl: 'No',
    webIp: '0.0.0.0',
    thickIp: 'N/A',
    serverIp: 'N/A',
    mobileIp: 'N/A'
  };
  //res.json(json_data);

  scannerIp = jsonData.webIp;
  scannerName = jsonData.requestNum + ' - ' + jsonData.appName;


/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
});

module.exports = router;
