const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a job title'],
            trim: true,
        },
        company: {
            type: String,
            required: [true, 'Please add a company name'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        experienceLevel: {
            type: String,
            enum: ['Junior', 'Mid', 'Senior'],
            required: [true, 'Please select experience level'],
        },
        type: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
            default: 'Full-time',
        },
        salaryRange: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            currency: { type: String, default: 'USD' },
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        skills: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for search performance
jobSchema.index({ title: 'text', company: 'text', skills: 'text' });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Job', jobSchema);
