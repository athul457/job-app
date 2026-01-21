const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User'); // Not strictly needed unless linking, but good practice

dotenv.config();

const jobs = [
    {
        title: "Frontend Developer",
        company: "TechCorp",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Junior",
        salaryRange: { min: 60000, max: 80000, currency: "USD" },
        description: "We are looking for a Junior Frontend Developer to build modern, responsive web applications using React and Tailwind CSS. You will work closely with designers and backend developers to implement UI components, optimize performance, and ensure cross-browser compatibility. Ideal for candidates eager to grow in a fast-paced product-driven environment.",
        skills: ["React", "JavaScript", "Tailwind CSS", "Git"]
    },
    {
        title: "Backend Engineer",
        company: "DataSystems",
        location: "New York, NY",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 90000, max: 120000, currency: "USD" },
        description: "Join our backend engineering team to design, build, and scale Node.js-based microservices. You will work on API development, database optimization, and system reliability while collaborating with frontend and DevOps teams to deliver high-performance solutions.",
        skills: ["Node.js", "Express", "MongoDB", "Docker"]
    },
    {
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "San Francisco, CA",
        type: "Contract",
        experienceLevel: "Senior",
        salaryRange: { min: 110000, max: 150000, currency: "USD" },
        description: "Design intuitive and visually compelling user interfaces for enterprise and startup clients. You will conduct user research, create wireframes and prototypes, and collaborate with developers to ensure pixel-perfect implementation across platforms.",
        skills: ["Figma", "Sketch", "Prototyping", "User Research"]
    },
    {
        title: "Full Stack Developer",
        company: "StartupX",
        location: "Austin, TX",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 100000, max: 130000, currency: "USD" },
        description: "Work across the full stack to develop, maintain, and scale features for a rapidly growing SaaS product. You will handle frontend interfaces, backend APIs, database design, and cloud deployments while contributing to architectural decisions.",
        skills: ["React", "Node.js", "PostgreSQL", "AWS"]
    },
    {
        title: "DevOps Engineer",
        company: "CloudScale",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 130000, max: 160000, currency: "USD" },
        description: "Manage and optimize cloud infrastructure, CI/CD pipelines, and deployment workflows. You will focus on system reliability, scalability, security, and automation while supporting engineering teams with DevOps best practices.",
        skills: ["AWS", "Kubernetes", "Terraform", "Jenkins"]
    },
    {
        title: "React Native Developer",
        company: "MobileFirst",
        location: "London, UK",
        type: "Contract",
        experienceLevel: "Mid",
        salaryRange: { min: 80000, max: 110000, currency: "GBP" },
        description: "Build and maintain high-quality cross-platform mobile applications for iOS and Android. You will collaborate with designers and backend teams to deliver smooth, performant, and user-friendly mobile experiences.",
        skills: ["React Native", "TypeScript", "Redux", "Mobile UI"]
    },
    {
        title: "Product Manager",
        company: "Innovate Inc",
        location: "Berlin, DE",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 70000, max: 95000, currency: "EUR" },
        description: "Lead the product vision, roadmap, and execution for our core platform. You will gather requirements, prioritize features, coordinate with cross-functional teams, and ensure products deliver strong customer value.",
        skills: ["Product Strategy", "Agile", "Jira", "User Stories"]
    },
    {
        title: "Data Scientist",
        company: "AI Solutions",
        location: "Toronto, CA",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 95000, max: 125000, currency: "CAD" },
        description: "Analyze large datasets to uncover insights, build predictive models, and support data-driven decision making. You will work closely with engineers and business teams to deploy machine learning solutions.",
        skills: ["Python", "Pandas", "Machine Learning", "SQL"]
    },
    {
        title: "QA Engineer",
        company: "QualitySoft",
        location: "Remote",
        type: "Part-time",
        experienceLevel: "Junior",
        salaryRange: { min: 40000, max: 55000, currency: "USD" },
        description: "Ensure software quality through manual and automated testing. You will identify bugs, write test cases, collaborate with developers, and help maintain high reliability across releases.",
        skills: ["Selenium", "Cypress", "Manual Testing", "Bug Identification"]
    },
    {
        title: "Technical Writer",
        company: "DocuTech",
        location: "Remote",
        type: "Freelance",
        experienceLevel: "Mid",
        salaryRange: { min: 50, max: 80, currency: "USD/hr" },
        description: "Create clear, concise, and developer-friendly documentation including API references, guides, and tutorials. You will work with engineering teams to translate complex concepts into readable content.",
        skills: ["Technical Writing", "Markdown", "API Documentation", "English"]
    },

    /* -------------------- 30 NEW JOBS -------------------- */

    {
        title: "Software Engineer",
        company: "NextGen Tech",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 85000, max: 115000, currency: "USD" },
        description: "Develop scalable software solutions using modern programming practices. You will work on core features, code reviews, and system improvements.",
        skills: ["JavaScript", "Node.js", "System Design", "Git"]
    },
    {
        title: "Machine Learning Engineer",
        company: "DeepAI",
        location: "San Jose, CA",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 140000, max: 180000, currency: "USD" },
        description: "Design, train, and deploy machine learning models in production environments. You will work on data pipelines, model optimization, and scalable ML systems.",
        skills: ["Python", "TensorFlow", "PyTorch", "MLOps"]
    },
    {
        title: "Android Developer",
        company: "AppWorks",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 90000, max: 120000, currency: "USD" },
        description: "Build and maintain Android applications with a focus on performance, usability, and scalability.",
        skills: ["Kotlin", "Android SDK", "REST APIs", "MVVM"]
    },
    {
        title: "iOS Developer",
        company: "AppleSoft",
        location: "Cupertino, CA",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 130000, max: 170000, currency: "USD" },
        description: "Develop high-quality iOS applications with Swift, focusing on performance and user experience.",
        skills: ["Swift", "iOS SDK", "UIKit", "SwiftUI"]
    },
    {
        title: "Blockchain Developer",
        company: "ChainWorks",
        location: "Remote",
        type: "Contract",
        experienceLevel: "Mid",
        salaryRange: { min: 100000, max: 140000, currency: "USD" },
        description: "Develop and maintain blockchain-based applications and smart contracts.",
        skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts"]
    },
    {
        title: "Game Developer",
        company: "PlayVerse",
        location: "Tokyo, JP",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 85000, max: 115000, currency: "USD" },
        description: "Design and develop engaging gameplay mechanics and real-time systems.",
        skills: ["Unity", "C#", "Game Physics", "Optimization"]
    },
    {
        title: "System Administrator",
        company: "ITCore",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 70000, max: 95000, currency: "USD" },
        description: "Maintain and manage servers, networks, and system security.",
        skills: ["Linux", "Networking", "Shell Scripting", "Monitoring"]
    },
    {
        title: "Business Analyst",
        company: "BizTech",
        location: "Dubai, UAE",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 60000, max: 85000, currency: "USD" },
        description: "Analyze business requirements and translate them into technical solutions.",
        skills: ["Requirement Analysis", "SQL", "Documentation", "Stakeholder Management"]
    },
    {
        title: "HR Tech Recruiter",
        company: "TalentHub",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Junior",
        salaryRange: { min: 45000, max: 65000, currency: "USD" },
        description: "Source, screen, and hire top tech talent across multiple roles.",
        skills: ["Recruitment", "Communication", "ATS", "LinkedIn"]
    },
    {
        title: "SEO Analyst",
        company: "SearchBoost",
        location: "Remote",
        type: "Contract",
        experienceLevel: "Mid",
        salaryRange: { min: 55000, max: 75000, currency: "USD" },
        description: "Optimize websites and content to improve organic search rankings. You will conduct keyword research, technical SEO audits, and link-building strategies to drive traffic growth for diverse clients.",
        skills: ["SEO", "Google Analytics", "Keyword Research", "Content Strategy"]
    },
    // New 30 Jobs
    {
        title: "Senior Cybersecurity Engineer",
        company: "DefenseNet",
        location: "Washington, DC",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 140000, max: 180000, currency: "USD" },
        description: "Lead security architecture design and implementation for critical infrastructure. You will conduct vulnerability assessments, manage incident response, and ensure compliance with federal security standards like NIST and GDPR. Requires deep knowledge of network security and encryption protocols.",
        skills: ["Network Security", "Penetration Testing", "CISSP", "Firewalls"]
    },
    {
        title: "Cloud Solutions Architect",
        company: "SkyHigh Cloud",
        location: "Seattle, WA",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 160000, max: 200000, currency: "USD" },
        description: "Design scalable, resilient cloud solutions for enterprise clients migrating to AWS and Azure. You will define cloud strategy, oversee migration projects, and optimize costs while ensuring high availability and disaster recovery.",
        skills: ["AWS Solutions Architect", "Azure", "Microservices", "Cloud Security"]
    },
    {
        title: "Data Engineer",
        company: "BigData Corp",
        location: "Austin, TX",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 110000, max: 140000, currency: "USD" },
        description: "Build and maintain robust ETL pipelines processing terabytes of data daily. You will work with Apache Spark, Kafka, and Snowflake to ensure data quality and availability for analytics and machine learning teams.",
        skills: ["Apache Spark", "Kafka", "Python", "SQL", "Snowflake"]
    },
    {
        title: "AI Research Scientist",
        company: "NeuroTech Labs",
        location: "Boston, MA",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 180000, max: 250000, currency: "USD" },
        description: "Conduct cutting-edge research in NLP and Computer Vision. You will publish papers, prototype new models, and collaborate with engineering teams to productize state-of-the-art AI advancements.",
        skills: ["PyTorch", "NLP", "Deep Learning", "Research", "Mathematics"]
    },
    {
        title: "Site Reliability Engineer (SRE)",
        company: "Uptime Global",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 120000, max: 150000, currency: "USD" },
        description: "Ensure the reliability and performance of our global platform. You will manage Kubernetes clusters, automate infrastructure with Terraform, and implement observability using Prometheus and Grafana. On-call rotation required.",
        skills: ["Kubernetes", "Terraform", "Go", "Prometheus", "Incident Response"]
    },
    {
        title: "React Native Lead",
        company: "Appify",
        location: "Los Angeles, CA",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 130000, max: 165000, currency: "USD" },
        description: "Lead the mobile development team in building a high-traffic consumer app. You will make architectural decisions, mentor junior developers, and ensure a silky smooth 60fps experience on both iOS and Android.",
        skills: ["React Native", "Redux Saga", "Native Modules", "Performance Optimization"]
    },
    {
        title: "Product Designer",
        company: "CreativeFlow",
        location: "San Francisco, CA",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 100000, max: 135000, currency: "USD" },
        description: "Take ownership of the end-to-end design process, from user research to high-fidelity prototyping. You will collaborate closely with product managers to solve complex user problems with elegant, simple interfaces.",
        skills: ["Figma", "Design Systems", "User Research", "Prototyping"]
    },
    {
        title: "Technical Support Engineer",
        company: "SaaS Help",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Junior",
        salaryRange: { min: 55000, max: 75000, currency: "USD" },
        description: "Provide tier-2 technical support for our enterprise SaaS customers. You will troubleshoot API integrations, debug logs, and escalate critical issues to the engineering team while maintaining high customer satisfaction.",
        skills: ["Customer Support", "API Troubleshooting", "SQL", "Zendesk"]
    },
    {
        title: "Freelance Copywriter",
        company: "Marketing Pros",
        location: "Remote",
        type: "Freelance",
        experienceLevel: "Mid",
        salaryRange: { min: 60, max: 100, currency: "USD/hr" },
        description: "Write compelling copy for landing pages, email campaigns, and ad creatives. You need to understand conversion copywriting principles and be able to adapt your tone to different brand voices.",
        skills: ["Copywriting", "SEO", "Content Marketing", "Creative Writing"]
    },
    {
        title: "Unity Game Developer",
        company: "Indie Game Studio",
        location: "Vancouver, CA",
        type: "Contract",
        experienceLevel: "Mid",
        salaryRange: { min: 70000, max: 100000, currency: "CAD" },
        description: "Develop gameplay mechanics and UI for an upcoming RPG title. You will work within Unity to implement features, optimize assets for mobile, and smash bugs before launch.",
        skills: ["Unity 3D", "C#", "Game Design Pattern", "HLSL Shaders"]
    },
    {
        title: "Junior Python Developer",
        company: "DataScrape Inc",
        location: "Chicago, IL",
        type: "Full-time",
        experienceLevel: "Junior",
        salaryRange: { min: 70000, max: 90000, currency: "USD" },
        description: "Assist in building data scraping bots and automation scripts. You will maintain existing crawlers, write new scrapers using Scrapy and Selenium, and clean data for downstream analysis.",
        skills: ["Python", "Scrapy", "Selenium", "BeautifulSoup"]
    },
    {
        title: "DevSecOps Engineer",
        company: "FinTech Secure",
        location: "New York, NY",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 150000, max: 190000, currency: "USD" },
        description: "Integrate security into our CI/CD pipelines. You will automate security testing (DAST/SAST), manage secrets with Vault, and ensure our containerized infrastructure complies with financial regulations.",
        skills: ["Jenkins", "Vault", "Docker Security", "Python", "Compliance"]
    },
    {
        title: "Blockchain Smart Contract Auditor",
        company: "ChainAudit",
        location: "Remote",
        type: "Contract",
        experienceLevel: "Senior",
        salaryRange: { min: 150, max: 300, currency: "USD/hr" },
        description: "Review and audit Solidity smart contracts for security vulnerabilities. You will write comprehensive audit reports and advise DeFi protocols on best practices to prevent hacks.",
        skills: ["Solidity", "EVM", "Security Auditing", "Truffle/Hardhat"]
    },
    {
        title: "Email Marketing Specialist",
        company: "EcomGrowth",
        location: "Remote",
        type: "Part-time",
        experienceLevel: "Mid",
        salaryRange: { min: 30000, max: 50000, currency: "USD" },
        description: "Manage email automation flows and weekly newsletters for e-commerce brands. You will segement audiences, A/B test subject lines, and analyze open/click rates to maximize revenue per user.",
        skills: ["Klaviyo", "Mailchimp", "Copywriting", "A/B Testing"]
    },
    {
        title: "AR/VR Developer",
        company: "MetaVerse Solutions",
        location: "Austin, TX",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 110000, max: 140000, currency: "USD" },
        description: "Build immersive AR experiences for mobile devices. Using ARKit and ARCore, you will create interactive marketing campaigns and educational apps that blend the physical and digital worlds.",
        skills: ["Unity", "ARKit", "ARCore", "C#", "3D Math"]
    },
    {
        title: "Salesforce Administrator",
        company: "Global Corp",
        location: "Denver, CO",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 85000, max: 110000, currency: "USD" },
        description: "Manage our Salesforce instance, users, roles, and profiles. You will create custom workflows, reports, and dashboards to support the sales and support teams.",
        skills: ["Salesforce Admin", "CRM", "Apex", "Workflows"]
    },
    {
        title: "Rust Systems Programmer",
        company: "LowLevel Systems",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 160000, max: 210000, currency: "USD" },
        description: "Build high-performance, memory-safe backend services in Rust. You will work on distributed systems requiring low latency and high concurrency.",
        skills: ["Rust", "Systems Programming", "Concurrency", "Distributed Systems"]
    },
    {
        title: "Digital Marketing Manager",
        company: "BrandBoost",
        location: "Miami, FL",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 90000, max: 120000, currency: "USD" },
        description: "Oversee digital marketing strategy across paid social, search, and display channels. You will manage a budget of $50k/month, optimizing ROAS and leading a small team of specialists.",
        skills: ["Facebook Ads", "Google Ads", "Analytics", "Strategy"]
    },
    {
        title: "Entry Level Java Developer",
        company: "Enterprise Inc",
        location: "Dallas, TX",
        type: "Full-time",
        experienceLevel: "Junior",
        salaryRange: { min: 65000, max: 80000, currency: "USD" },
        description: "Join a large team maintaining legitimate legacy enterprise applications. You will fix bugs, write unit tests, and slowly refactor modules to Spring Boot under the guidance of senior devs.",
        skills: ["Java", "Spring Boot", "SQL", "Junit"]
    },
    {
        title: "Quantitative Analyst",
        company: "HedgeFund X",
        location: "New York, NY",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 200000, max: 350000, currency: "USD" },
        description: "Develop mathematical models to identify trading opportunities in financial markets. You will backtest strategies using Python/C++ and work closely with traders to deploy algorithms.",
        skills: ["Quantitative Finance", "Python", "Statistics", "C++"]
    },
    {
        title: "Vue.js Developer",
        company: "WebAgency",
        location: "Remote",
        type: "Contract",
        experienceLevel: "Mid",
        salaryRange: { min: 50, max: 80, currency: "USD/hr" },
        description: "Build interactive dashboards for a client in the logistics sector. You should be proficient with Vue 3, Composition API, and state management using Pinia.",
        skills: ["Vue.js", "Javascript", "Pinia", "CSS Grid"]
    },
    {
        title: "Network Engineer",
        company: "Telecom Giants",
        location: "Atlanta, GA",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 90000, max: 115000, currency: "USD" },
        description: "Manage and troubleshoot wide area networks (WAN) and local area networks (LAN). You will configure Cisco routers/switches and ensure 99.99% network uptime.",
        skills: ["Cisco", "CCNA/CCNP", "Routing & Switching", "Network Security"]
    },
    {
        title: "Ruby on Rails Developer",
        company: "Legacy App Maintainers",
        location: "Portland, OR",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 130000, max: 160000, currency: "USD" },
        description: "Maintain and feature-build a mature monolith used by thousands of users. We appreciate clean, tested code and adherence to the Rails Way.",
        skills: ["Ruby", "Rails", "RSpec", "PostgreSQL"]
    },
    {
        title: "IT Project Manager",
        company: "Consulting Firm",
        location: "Chicago, IL",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 110000, max: 145000, currency: "USD" },
        description: "Lead Agile software development projects for external clients. You will manage timelines, scope, and resources while acting as the primary point of contact for stakeholders.",
        skills: ["Project Management", "Agile", "Scrum Master", "Communication"]
    },
    {
        title: "Embedded Systems Engineer",
        company: "IoT Devices",
        location: "San Diego, CA",
        type: "Full-time",
        experienceLevel: "Mid",
        salaryRange: { min: 100000, max: 130000, currency: "USD" },
        description: "Write firmware for low-power smart home devices. You need experience with C/C++, RTOS, and debugging hardware interfaces like I2C and SPI.",
        skills: ["C", "Embedded Systems", "RTOS", "Hardware Debugging"]
    },
    {
        title: "Growth Hacker",
        company: "New Startup",
        location: "Remote",
        type: "Contract",
        experienceLevel: "Mid",
        salaryRange: { min: 4000, max: 6000, currency: "USD/mo" },
        description: "Experiment rapidly across marketing channels to find scalable growth levers. You will set up viral loops, optimize referral programs, and scrape leads.",
        skills: ["Marketing Automation", "Data Analysis", "Creativity", "Coding"]
    },
    {
        title: "Database Administrator (DBA)",
        company: "DataWarehousers",
        location: "Remote",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 120000, max: 150000, currency: "USD" },
        description: "Manage large-scale PostgreSQL and Oracle databases. You will handle backups, replication, performance tuning, and disaster recovery planning.",
        skills: ["PostgreSQL", "Oracle", "SQL Tuning", "Database Management"]
    },
    {
        title: "3D Artist",
        company: "Game Assets Ltd",
        location: "Montreal, CA",
        type: "Contract",
        experienceLevel: "Mid",
        salaryRange: { min: 60000, max: 80000, currency: "CAD" },
        description: "Model and texture stylized 3D environment assets for games. You must be proficient in Blender or Maya and understand PBR workflow.",
        skills: ["Blender", "Maya", "Texturing", "ZBrush"]
    },
    {
        title: "Chief Technology Officer (CTO)",
        company: "Stealth Startup",
        location: "San Francisco, CA",
        type: "Full-time",
        experienceLevel: "Senior",
        salaryRange: { min: 180000, max: 250000, currency: "USD (+Equity)" },
        description: "Co-founder role. Build the MVP from scratch, hire the initial engineering team, and define the technical vision. Must be a hands-on coder willing to wear many hats.",
        skills: ["Leadership", "Full Stack Development", "System Architecture", "Hiring"]
    },
    {
        title: "Support Desk Technician",
        company: "Local MSP",
        location: "Phoenix, AZ",
        type: "Full-time",
        experienceLevel: "Junior",
        salaryRange: { min: 40000, max: 50000, currency: "USD" },
        description: "Provide on-site and remote IT support for small businesses. You will fix printer issues, reset passwords, and set up new workstations.",
        skills: ["Windows 10", "Hardware Troubleshooting", "Office 365", "Active Directory"]
    }
];


const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected to: ' + mongoose.connection.host);

        // Optional: Clear existing jobs
        // await Job.deleteMany(); 
        // console.log('Existing jobs removed');

        await Job.insertMany(jobs);
        console.log('Jobs Imported Successfully!');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
