var express = require('express');
var router = express.Router();
ScannerIP = {};
ScannerName ={};

json_data={
    Status: 'Review in Progress',
    Request_Num: '145218130',
    Application_Name: 'boxi-epe',
    Internet_Facing: 'No',
    Exp_Ctrl: 'No',
    Web_IP: '3.211.65.171',
    Thick_IP: 'N/A',
    Servers_IP: 'N/A',
    Mobile_IP: 'N/A'
  };
  //res.json(json_data);

  ScannerIP = json_data.Web_IP;
  ScannerName = json_data.Request_Num + ' - ' + json_data.Application_Name;


/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
});

module.exports = router;
