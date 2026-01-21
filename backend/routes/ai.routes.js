const express = require('express');
const router = express.Router();
const { generateKeywords, analyzeResume, analyzeCustom, chat } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/keywords', protect, generateKeywords);
router.post('/analyze-resume', protect, analyzeResume);
router.post('/analyze-custom', protect, analyzeCustom);
router.post('/chat', protect, chat);

module.exports = router;
