const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Check if email is taken by another user
        if (req.body.email && req.body.email !== req.user.email) {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                res.status(400);
                throw new Error('Email already in use');
            }
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImage: updatedUser.profileImage,
            token: req.headers.authorization.split(' ')[1], // Return same token
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
const updateUserPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        if (req.body.password) {
            user.password = req.body.password; // Will be hashed by pre-save hook
            await user.save();
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(400);
            throw new Error('Please provide a new password');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Upload profile image
// @route   PUT /api/users/profile-image
// @access  Private
const uploadProfileImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload a file');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Upload to Cloudinary using stream
    const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'job-ready-app/avatars' },
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            stream.write(buffer);
            stream.end();
        });
    };

    const result = await streamUpload(req.file.buffer);

    // Update user profile image URL
    user.profileImage = result.secure_url;
    await user.save();

    res.json({
        message: 'Image uploaded successfully',
        profileImage: user.profileImage,
    });
});

module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    uploadProfileImage
};
