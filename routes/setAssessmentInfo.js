var express = require('express');
var router = express.Router();
ipRegex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

assessmentInfo={
  requestNum: '',
  appName: '',
  description: '',
  ips: '3.211.65.171'
};

router.post('/', function(req, res, next) {
  if (ipRegex.test(req.body.ips)){
    assessmentInfo.ips = req.body.ips;
    res.send(JSON.parse('{"status": "success","message":"values have been saved."}'));
  }else{
    res.send(JSON.parse('{"status": "failed","message":"invalid parameter."}'));
  }
});

module.exports = router;
