var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/streamworks');

var db = mongoose.connection;

var invoiceSchema = new mongoose.Schema({
  recipient_address: String,
  sender_address: String,
  amount: Number,
  description: String,
  label: String,
  status: { type: String, default: 'unpaid' },
  transaction_status: { type: String, default: 'unknown' },
  transaction_hash: String,
  selectedInvoiceDate: Date,
  selectedFinanceDate : Date,
  invoiceNumber : String,
  customerName : String,
  date_created: Date,
  storeItem: String,
  discount: Number,
  //below are the phase two
  status2: { type: String, default: 'unpaid' },
  transaction_status2: { type: String, default: 'unknown' },
  transaction_hash2: String
});

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
