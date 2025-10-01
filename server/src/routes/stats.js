const express = require('express');
const {
  getDashboardStats,
  getReportStats,
  getUserStats,
  getOrganizationStats
} = require('../controllers/statsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/dashboard', getDashboardStats);
router.get('/reports', getReportStats);

// Admin only routes
router.get('/users', protect, authorize('admin'), getUserStats);
router.get('/organizations', protect, authorize('admin'), getOrganizationStats);

module.exports = router;
