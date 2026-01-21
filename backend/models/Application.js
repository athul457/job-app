const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Job',
        },
        resume: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Resume',
        },
        status: {
            type: String,
            enum: ['Applied', 'Reviewed', 'Interview', 'Rejected', 'Hired'],
            default: 'Applied',
        },
        atsScore: {
            type: Number,
            min: 0,
            max: 100,
        },
        matchedKeywords: [String],
        missingKeywords: [String],
        strengths: [String],
        suggestions: [String],
        analyzedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate applications
applicationSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
