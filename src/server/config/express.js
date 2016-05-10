/*
 * Express configuration
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./environment');


module.exports = function(app) {

  // Set some App variables
  app.engine('html', require('ejs').renderFile);
  app.set('env', config.env);
  app.set('ip', config.ip);
  app.set('port', config.port);
  app.set('views', config.root + '/src/server/views');
  app.set('view engine', 'html');

  // Middleware
  console.log(config.root)
  app.use(express.static(config.root + '/dist'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());


  var env = app.get('env');

  if ('production' === env) {

  }

  if ('development' === env) {

  }

};
