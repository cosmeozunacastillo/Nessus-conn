var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(nmapScanRecorder);
  res.render('index', { title: 'Nmap Scan API.' });
});

module.exports = router;
