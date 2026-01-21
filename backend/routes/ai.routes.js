const express = require('express');
const router = express.Router();
const { generateKeywords, analyzeResume, chat } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/keywords', protect, generateKeywords);
router.post('/analyze-resume', protect, analyzeResume);
router.post('/chat', protect, chat);

module.exports = router;
