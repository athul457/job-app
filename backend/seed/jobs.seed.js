const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../models/Job');
const connectDB = require('../config/db');

dotenv.config({ path: '../.env' }); // Adjust path if necessary

const jobs = [
    {
        title: 'Frontend Developer',
        company: 'TechCorp',
        location: 'Remote',
        experienceLevel: 'Junior',
        description: 'We are looking for a passionate Frontend Developer with React and Tailwind CSS skills.',
        skills: ['React', 'JavaScript', 'Tailwind CSS', 'Git'],
    },
    {
        title: 'Backend Engineer',
        company: 'ServerSide Solutions',
        location: 'New York, NY',
        experienceLevel: 'Mid',
        description: 'Join our backend team to build scalable APIs using Node.js and MongoDB.',
        skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    },
    {
        title: 'Full Stack Developer',
        company: 'StartupX',
        location: 'San Francisco, CA',
        experienceLevel: 'Senior',
        description: 'Lead our engineering team in building the next gen job portal.',
        skills: ['MERN Stack', 'AWS', 'System Design', 'CI/CD'],
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        location: 'Remote',
        experienceLevel: 'Mid',
        description: 'Design beautiful interfaces for web and mobile applications.',
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    },
    {
        title: 'DevOps Engineer',
        company: 'CloudNative',
        location: 'Austin, TX',
        experienceLevel: 'Senior',
        description: 'Manage our cloud infrastructure and deployment pipelines.',
        skills: ['Kubernetes', 'Terraform', 'Jenkins', 'Python'],
    },
];

const seedJobs = async () => {
    try {
        await connectDB();

        await Job.deleteMany(); // Clear existing jobs
        await Job.insertMany(jobs);

        console.log('Jobs Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedJobs();
