const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getInsights } = require('../controllers/aiController');

router.route('/insights')
  .get(protect, getInsights);

module.exports = router;
