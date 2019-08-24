const mongoose = require('mongoose');
const schema = mongoose.Schema;
/**
* Invoice model to store Invoice details in mongodb
* Invoice {
* invoice String
* upper Number
* lower Number
* noOfChildren Number
* children[noOfChildren]
* }
*/
const InvoiceSchema = new schema({
  status: {
    type: String,
    default:"pending"
  },
  invoice_number: {
    type: String,
    required: 'Enter Invoice Number'
  },
  total: {
    type: Number,
    required: 'Enter total'
  },
  currency: {
    type: String,
    required: 'Enter currency'
  },
  invoice_date: {
    type: String,
    required: 'Enter Date'
  },
  due_date: {
    type: String,
    required: 'Enter Date'
  },
  vendor_name: {
    type: String,
    required: 'Enter Vendor name'
  },
  remittance_address: {
    type: String,
    required: 'Enter address'
  }
});



module.exports = mongoose.model('Invoice', InvoiceSchema);
