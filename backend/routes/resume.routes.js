const express = require('express');
const router = express.Router();
const {
    createResume,
    getResumes,
    getResume,
    updateResume,
    deleteResume,
} = require('../controllers/resume.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes are protected
router.route('/')
    .get(protect, getResumes)
    .post(protect, createResume);

router.route('/:id')
    .get(protect, getResume)
    .put(protect, updateResume)
    .delete(protect, deleteResume);

module.exports = router;
