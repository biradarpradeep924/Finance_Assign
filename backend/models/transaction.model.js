const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: Date,
  status: String,
  user: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);