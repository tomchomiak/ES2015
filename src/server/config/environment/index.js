'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
var all = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../../..'),
  port: process.env.PORT || 9001
};

// Export the config object based on the NODE_ENV
module.exports = _.merge(
  all,
  require('./' + all.env + '.js') || {});
