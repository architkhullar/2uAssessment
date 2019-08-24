'user strict';

var mongoose = require('mongoose');
var invoice = mongoose.model('Invoice');


// controller for creating the invoice
exports.generateInvoice = function(req, res){

    // TODO - validations for valid date and timeout and throw corresponding error
    // TODO - validation for valid amount and throw corresponding error
    // TODO - check for unique receipt number for same vendors
    // TODO - checks for valid amount
    // TODO - validations for checking is the vendor using the api is authorized - can be done using jwt.io
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
