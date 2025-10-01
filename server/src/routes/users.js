const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats,
  getLeaderboard
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/leaderboard', getLeaderboard);
router.get('/:id', getUser);
router.get('/:id/stats', getUserStats);

// Protected routes
router.get('/', protect, authorize('admin'), getUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
