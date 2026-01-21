const express = require('express');
const router = express.Router();
const {
    getDashboard,
    getDashboardStats,
} = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes here should be protected
// We can apply middleware to individual routes for clarity

router.get('/', protect, getDashboard);
router.get('/stats', protect, getDashboardStats);

module.exports = router;
