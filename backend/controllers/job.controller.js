const Job = require('../models/Job');
const Application = require('../models/Application');
const Resume = require('../models/Resume');

// @desc    Get all jobs (Search, Filter, Sort, Pagination)
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res, next) => {
    try {
        const { keyword, experienceLevel, type, minSalary, sort, page = 1, limit = 10 } = req.query;

        // Build query
        let query = {};

        // Search by text index
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { company: { $regex: keyword, $options: 'i' } },
                { skills: { $in: [new RegExp(keyword, 'i')] } }
            ];
        }

        // Filter by experience
        if (experienceLevel) {
            query.experienceLevel = experienceLevel; 
        }

        // Filter by job type
        if (type) {
            query.type = type;
        }

        // Filter by Minimum Salary
        if (minSalary) {
            query['salaryRange.min'] = { $gte: Number(minSalary) };
        }

        // Pagination setup
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sort
        let sortOption = {}; 
        if (sort === 'oldest') {
            sortOption = { createdAt: 1 };
        } else if (sort === 'a-z') {
            sortOption = { title: 1 };
        } else {
            sortOption = { createdAt: -1 }; // Default: Newest first
        }

        // Execute Query
        const jobs = await Job.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum);

        // Get total count for pagination metadata
        const total = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            meta: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum),
                limit: limitNum
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Apply to a job
// @route   POST /api/jobs/:id/apply
// @access  Private
const applyToJob = async (req, res, next) => {
    try {
        const { resumeId } = req.body;
        const jobId = req.params.id;

        if (!resumeId) {
            res.status(400);
            throw new Error('Please provide a resume ID');
        }

        const job = await Job.findById(jobId);
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        const resume = await Resume.findById(resumeId);
        if (!resume) {
            res.status(404);
            throw new Error('Resume not found');
        }

        if (resume.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Unauthorized to use this resume');
        }

        const existingApplication = await Application.findOne({
            user: req.user.id,
            job: jobId,
        });

        if (existingApplication) {
            res.status(400);
            throw new Error('You have already applied to this job');
        }

        const application = await Application.create({
            user: req.user.id,
            job: jobId,
            resume: resumeId,
        });

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application,
        });

    } catch (error) {
        if (error.code === 11000) {
            res.status(400);
            return res.json({
                success: false,
                message: 'You have already applied to this job',
            });
        }
        next(error);
    }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};

// @desc    Get current user's applications
// @route   GET /api/jobs/applications
// @access  Private
const getMyApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ user: req.user.id })
            .populate('job', 'title company location type salaryRange')
            .populate('resume', 'title')
            .sort('-createdAt');

        res.status(200).json(applications);
    } catch (error) {
        next(error);
    }
};

// @desc    Withdraw application
// @route   DELETE /api/jobs/applications/:id
// @access  Private
const withdrawApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }

        // Make sure user owns the application
        if (application.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await application.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Application withdrawn successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getJobs,
    applyToJob,
    getJobById,
    getMyApplications,
    withdrawApplication,
};
