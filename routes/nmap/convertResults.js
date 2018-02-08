var express = require('express');
var cp = require('child_process');
var router = express.Router();
var fs= require('fs');
var converter = require('xml2js');
var fileToConvert = './3.211.65.171.xml';

router.get('/', function(req, res, next) {
    var p = new converter.Parser();
    var readInfo = fs.readFileSync(fileToConvert, 'utf8');

    p.parseString(readInfo, function (err, result) {
      var s = JSON.stringify(result,undefined,3);
      console.log('Result: \n' + s + '\n');
      res.send(s);
    });
});
module.exports = router;
