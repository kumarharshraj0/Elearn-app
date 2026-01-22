const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authmiddleware');
const { getDashboardStats } = require('../controllers/admincontrollers');

router.route('/dashboard-stats').get(protect, authorize('admin'), getDashboardStats);

module.exports = router;