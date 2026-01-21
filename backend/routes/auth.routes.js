const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateRequest, schemas } = require('../middleware/validation.middleware');

router.post('/register', validateRequest(schemas.register), registerUser);
router.post('/login', validateRequest(schemas.login), loginUser);
router.get('/me', protect, getMe);

module.exports = router;
