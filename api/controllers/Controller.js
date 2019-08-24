'user strict';

var mongoose = require('mongoose');
var invoice = mongoose.model('Invoice');


// controller for creating the invoice
exports.generateInvoice = function(req, res){
    var newInvoice = new invoice(req.body);
    newInvoice.status = "pending";
    newInvoice.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err, status:'400'
      });
    } else {
      return res.json({"message": "invoice submitted successfully", status:'200'});
      }
  });
};
