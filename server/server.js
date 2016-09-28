var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  protectJSON = require('./lib/protectJSON');


var app = express();

// JSON Vulnerability Protection
app.use(protectJSON);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(config.server.staticFolder));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// For Resource not found by ID (ObjectID)
// Change response status to 404
app.use(function(err, req, res, next) {
  var msg = "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters";
  if (err.message === msg) {
    res.status(404);
    res.json({
      message: err.message,
      error: {}
    });
  }
});

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


exports = module.exports = app;
