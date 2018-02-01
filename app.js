var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var conn = require('./routes/conn');
var test = require('./routes/testing');
var Launch = require('./routes/launchScan');
var status = require('./routes/getScanStatus');
<<<<<<< HEAD
<<<<<<< HEAD
var Get_Info = require('./routes/Get_Assessment_Infor');
=======
>>>>>>> a0193c9683ad5d59c60f1ac6bd9bca168da40429
=======
var vulnerabilities = require('./routes/getScanVulnerabilities');
>>>>>>> e6ccc49118e8b267a2465aa1e3829cd5582bb51b

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
app.use('/users', users);
app.use('/conn', conn);
app.use('/testing', test);
app.use('/launchScan',Launch);
app.use('/getScanStatus',status);
<<<<<<< HEAD
<<<<<<< HEAD
app.use('/Get_Assessment_Infor',Get_Info);
=======
>>>>>>> a0193c9683ad5d59c60f1ac6bd9bca168da40429

=======
app.use('/getScanVulnerabilities',vulnerabilities);
>>>>>>> e6ccc49118e8b267a2465aa1e3829cd5582bb51b

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
