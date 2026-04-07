const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount']
  },
  type: {
    type: String,
    required: [true, 'Please specify if this is an income or expense'],
    enum: ['income', 'expense']
  },
  category: {
    type: String,
    required: [true, 'Please select a category']
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
