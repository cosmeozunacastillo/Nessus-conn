var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
<<<<<<< HEAD
var users = require('./routes/users');
var conn = require('./routes/conn');
var test = require('./routes/testing');
var Launch = require('./routes/launchScan');
var status = require('./routes/getScanStatus');
var Get_Info = require('./routes/Get_Assessment_Infor');
var vulnerabilities = require('./routes/getScanVulnerabilities');
=======

var nessusIndex = require('./routes/nessus/index');
var nessusConn = require('./routes/nessus/conn');
var nessusLaunch = require('./routes/nessus/launchScan');
var nessusStatus = require('./routes/nessus/getScanStatus');
var nessusVulnerabilities = require('./routes/nessus/getScanVulnerabilities');

var nmapIndex = require('./routes/nmap/index');

var webInspectIndex = require('./routes/webInspect/index');
>>>>>>> 40e5894cfcf953a60ed704f253ae96c81a694680

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
<<<<<<< HEAD
app.use('/users', users);
app.use('/conn', conn);
app.use('/testing', test);
app.use('/launchScan',Launch);
app.use('/getScanStatus',status);
app.use('/Get_Assessment_Infor',Get_Info);
app.use('/getScanVulnerabilities',vulnerabilities);
=======

app.use('/nessus/', nessusIndex);
app.use('/nessus/conn', nessusLaunch);
app.use('/nessus/launchScan',nessusLaunch);
app.use('/nessus/getScanStatus',nessusStatus);
app.use('/nessus/getScanVulnerabilities',nessusVulnerabilities);

app.use('/nmap/',nmapIndex);

app.use('/webInspect/',webInspectIndex);
>>>>>>> 40e5894cfcf953a60ed704f253ae96c81a694680

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
