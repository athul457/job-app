const express = require('express');
const router = express.Router();
const {
    getJobs,
    applyToJob,
    getJobById,
    getMyApplications,
    withdrawApplication,
} = require('../controllers/job.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getJobs);
router.get('/applications', protect, getMyApplications);
router.delete('/applications/:id', protect, withdrawApplication);
router.get('/:id', getJobById);
router.post('/:id/apply', protect, applyToJob);

module.exports = router;
