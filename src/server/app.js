// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
if (!process.env.NODE_ENV) { var config = require('../_config'); }
else {
  var config = process.env;
}


// *** routes *** //
var routes = require('./routes/index.js');
var postsRoutes = require('./routes/posts.js');
// NEED TO ADD MORE ROUTES


// *** express instance *** //
var app = express();


// *** set up mongo *** //
var environment = process.env.NODE_ENV || 'development';
if (!process.env.NODE_ENV) {
    var mongoURI = config.mongoURI[environment];
} else {
  var mongoURI = process.env.MONGODB_URI;
}


mongoose.connect(mongoURI, function(err, res) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  }
});


// *** view engine *** //
// var swig = new swig.Swig();
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html');


// *** static directory *** //
// app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/', routes);
app.use('/posts', postsRoutes);
// NEED TO ADD MORE ROUTES


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;