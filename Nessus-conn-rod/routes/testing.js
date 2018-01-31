var express = require('express');
var router = express.Router();
var getObj = require('./conn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var result = getObj.reqPost(res);
  res.send(result);
});

module.exports = router;
