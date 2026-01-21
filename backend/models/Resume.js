const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a resume title'],
            trim: true,
        },
        template: {
            type: String,
            required: [true, 'Please select a template'],
            default: 'modern',
        },
        content: {
            type: Object, // Structured JSON data for the resume
            default: {},
        },
        keywords: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
resumeSchema.index({ user: 1 });
resumeSchema.index({ title: 'text' });

module.exports = mongoose.model('Resume', resumeSchema);
