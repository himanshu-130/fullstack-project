const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");

router.route('/')
  .get(protect, getTransactions)
  .post(
    protect,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('amount', 'Amount is required and must be a number').isNumeric(),
      check('type', 'Type must be income or expense').isIn(['income', 'expense']),
      check('category', 'Category is required').not().isEmpty(),
      check('date', 'Date is required').not().isEmpty()
    ],
    addTransaction
  );

router.route('/:id')
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;