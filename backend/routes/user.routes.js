const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    uploadProfileImage
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/me', protect, getUserProfile);
router.put('/update', protect, updateUserProfile);
router.put('/password', protect, updateUserPassword);
router.put('/profile-image', protect, upload.single('image'), uploadProfileImage);

module.exports = router;
