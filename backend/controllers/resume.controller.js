const Resume = require('../models/Resume');

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res, next) => {
    try {
        const { title, template, content } = req.body;

        if (!title || !template) {
            res.status(400);
            throw new Error('Please provide title and template');
        }

        const resume = await Resume.create({
            user: req.user.id,
            title,
            template,
            content: content || {}, // Optional initial content
        });

        res.status(201).json(resume);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all resumes for logged-in user with Pagination
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res, next) => {
    try {
        const { keyword, page = 1, limit = 10 } = req.query;
        
        // Build query
        const query = { user: req.user.id };
        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }

        // Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        const resumes = await Resume.find(query)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limitNum);
            
        const total = await Resume.countDocuments(query);

        res.status(200).json({
            resumes,
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

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResume = async (req, res, next) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            res.status(404);
            throw new Error('Resume not found');
        }

        if (resume.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        res.status(200).json(resume);
    } catch (error) {
        next(error);
    }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res, next) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            res.status(404);
            throw new Error('Resume not found');
        }

        if (resume.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedResume);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res, next) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            res.status(404);
            throw new Error('Resume not found');
        }

        if (resume.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        await resume.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Resume removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createResume,
    getResumes,
    getResume,
    updateResume,
    deleteResume,
};
