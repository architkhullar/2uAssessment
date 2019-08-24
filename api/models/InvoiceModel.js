'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* sample query
{
  "invoice_number": "12345",
  "total": "199.99",
  "currency": "USD",
  "invoice_date": "2019-08-17",
  "due_date": "2019-09-17",
  "vendor_name": "Acme Cleaners Inc.",
  "remittance_address": "123 ABC St. Charlotte, NC 28209"
}
*/


var InvoiceSchema = new Schema({
  invoice_number:{
    type: String,
    required: 'Kindly enter the invoice number'
  },
  total: {
    type: Number,
    required: 'Kindly enter the total amount'
  },
  currency: {
    type: String,
    required: 'Kindly enter the currency'
  },
  invoice_date: {
    type: String,
    required: 'Kindly enter the invoice date'
  },
  due_date: {
    type: String,
    required: 'Kindly enter the due date'
  },
  vendor_name: {
    type: String,
    required: 'Kindly enter the vendor name'
  },
  remittance_address: {
    type: String,
    required: 'Kindly enter the address'
  },
  status: {
    type: String,
    default: 'pending'
  },
});


module.exports = mongoose.model('Invoice', InvoiceSchema);
