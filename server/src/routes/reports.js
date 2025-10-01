const express = require('express');
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  verifyReport,
  assignReport,
  upvoteReport,
  getUserReports
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/auth');
const { uploadMultiple, processMultipleImages } = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getReports);
router.get('/:id', getReport);
router.get('/user/:userId', getUserReports);

// Protected routes (Citizen)
router.post('/', protect, authorize('citizen', 'admin'), uploadMultiple, processMultipleImages, createReport);
router.put('/:id', protect, updateReport);
router.delete('/:id', protect, deleteReport);
router.put('/:id/upvote', protect, upvoteReport);

// Admin only routes
router.put('/:id/verify', protect, authorize('admin'), verifyReport);
router.put('/:id/assign', protect, authorize('admin'), assignReport);

module.exports = router;
