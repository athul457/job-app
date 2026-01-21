// @desc    Get dashboard welcome and user info
// @route   GET /api/dashboard
// @access  Private
const getDashboard = async (req, res, next) => {
    try {
        // req.user is already available thanks to the 'protect' middleware
        res.status(200).json({
            success: true,
            message: `Welcome to your dashboard, ${req.user.name}`,
            user: {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name,
                joinDate: req.user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
    try {
        // Dummy statistics for now
        // In a real app, these would come from database queries
        const stats = {
            jobsApplied: 12,
            interviewsScheduled: 3,
            profileViews: 45,
            savedJobs: 8,
        };

        res.status(200).json({
            success: true,
            stats,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboard,
    getDashboardStats,
};
