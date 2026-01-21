const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/error.middleware');

// Route Imports
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const userRoutes = require('./routes/user.routes');
const resumeRoutes = require('./routes/resume.routes');
const jobRoutes = require('./routes/job.routes');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// Security Middleware
app.use(helmet()); // Set security headers
// app.use(express.json({ limit: '10kb' })); // Body limit is 10kb
app.use(express.json()); // Body limit is 10kb


app.use(
  cors({
    origin: ["https://cheery-selkie-29d04f.netlify.app","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);


// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: { message: 'Too many requests from this IP, please try again in 10 minutes' }
});
app.use('/api', limiter);

app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

// Error Handling
app.use(errorHandler);

module.exports = app;



// app.use(cors({
//     // origin: ['https://cheery-selkie-29d04f.netlify.app/'],
//     origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
//     credentials: true
// }));