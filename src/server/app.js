/*
 * Main application file
 */


'use strict';

var express = require('express');
var app = express();

require('./config/express')(app);
require('./routes')(app);

// Start app
app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Server listening on %d, in %s mode', app.get('port'), app.get('env'));
});

// Expose app to brunch
exports = module.exports = app;
