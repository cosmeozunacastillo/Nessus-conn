var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');


var nessusIndex = require('./routes/nessus/index');
var nessusConn = require('./routes/nessus/conn');
var nessusLaunch = require('./routes/nessus/launchScan');
var nessusVulnerabilities = require('./routes/nessus/getScanVulnerabilities');
var nessusGetScanStatus = require('./routes/nessus/getScanStatus');
var nessusValidateToken = require('./routes/nessus/validateToken');


var nmapConverter = require('./routes/nmap/convertResults');
var nmapIndex = require('./routes/nmap/index');
var nmapLaunch = require('./routes/nmap/launchScan');


var webInspectIndex = require('./routes/webInspect/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/nessus/', nessusIndex);
app.use('/nessus/conn', nessusLaunch);
app.use('/nessus/launchScan',nessusLaunch);
app.use('/nessus/getScanVulnerabilities',nessusVulnerabilities);
app.use('/nessus/validateToken',nessusValidateToken);
app.use('/nessus/getScanStatus',nessusGetScanStatus);

app.use('/nmap/',nmapIndex);
app.use('/nmap/launchScan',nmapLaunch);
app.use('/nmap/convertResults', nmapConverter);

app.use('/webInspect/',webInspectIndex);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
