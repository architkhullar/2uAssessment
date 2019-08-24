'use strict';
module.exports = function(app) {
  var Handlers = require('../controllers/Controller.js');


  // route for submitting an invoice
  app.route('/Invoice')
    .post(Handlers.generateInvoice);

};
