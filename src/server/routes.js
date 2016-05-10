/*
 * Main application routes
 */

'use strict';


module.exports = function(app) {

  // Insert routes here

  // 404
  app.get('/*', function (req, res) {
    res.status(404);
    res.render('404', {url: req.url});
  });

};
