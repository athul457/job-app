const model = require('../config/gemini');
const Resume = require('../models/Resume');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Local keyword extraction fallback
const extractLocalKeywords = (text) => {
    if (!text) return [];
    
    // Common tech keywords to look for
    const techStack = [
        "react", "angular", "vue", "node.js", "express", "mongodb", "sql", "postgresql",
        "python", "java", "c++", "c#", "aws", "azure", "docker", "kubernetes", "git",
        "ci/cd", "agile", "scrum", "rest api", "graphql", "typescript", "javascript",
        "html", "css", "tailwind", "redux", "jest", "machine learning", "ai", "data analysis"
    ];

    const lowerText = text.toLowerCase();
    const foundKeywords = new Set();

    // Check for specific tech keywords
    techStack.forEach(tech => {
        if (lowerText.includes(tech)) {
            foundKeywords.add(tech);
        }
    });

    // Simple frequency analysis for other capitalized terms (potential skills) if text allows
    // ... (omitted for brevity, relying on explicit list is safer for "keywords" context)

    return Array.from(foundKeywords);
};

// @desc    Generate ATS keywords for a resume and target role/description
// @route   POST /api/ai/keywords
// @access  Private
const generateKeywords = async (req, res, next) => {
    try {
        const { jobDescription, role } = req.body; // Changed from resumeId to direct input

        if (!jobDescription && !role) {
            res.status(400);
            throw new Error('Please provide job description or role');
        }

        const inputText = jobDescription || role;

        try {
            // Attempt Gemini API
            if (!process.env.GEMINI_API_KEY) throw new Error("No API Key");

            const prompt = `
                Act as an ATS expert. Extract the top 10-15 most important technical and soft skill keywords from the following job description.
                
                Job Description:
                "${inputText.substring(0, 5000)}"

                Output ONLY a JSON array of strings. Example: ["react", "python"].
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            const cleanedText = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
            const keywords = JSON.parse(cleanedText);
            
            return res.status(200).json({
                success: true,
                source: 'ai',
                keywords: keywords.map(k => k.toLowerCase())
            });

        } catch (aiError) {
            console.warn("AI Generation failed, falling back to local extraction:", aiError.message);
            
            // Fallback Logic
            const localKeywords = extractLocalKeywords(inputText);
            
            // If local extraction yields few results, add generic ones based on simple role matching
            if (localKeywords.length < 5) {
                if (inputText.toLowerCase().includes('frontend')) {
                    localKeywords.push('react', 'javascript', 'css', 'html', 'responsive design');
                } else if (inputText.toLowerCase().includes('backend')) {
                     localKeywords.push('node.js', 'database', 'api', 'server', 'security');
                }
            }

            return res.status(200).json({
                success: true,
                source: 'local_fallback',
                keywords: localKeywords
            });
        }

    } catch (error) {
        console.error('AI Controller Error:', error);
        next(error);
    }
};

// @desc    Analyze resume against a specific job
// @route   POST /api/ai/analyze-resume
// @access  Private
const analyzeResume = async (req, res, next) => {
    try {
        const { resumeId, jobId } = req.body;

        if (!resumeId || !jobId) {
            res.status(400);
            throw new Error('Please provide resumeId and jobId');
        }

        // 1. Fetch Resume, Job, and Application
        const resume = await Resume.findById(resumeId);
        const job = await Job.findById(jobId);
        
        if (!resume) { res.status(404); throw new Error('Resume not found'); }
        if (!job) { res.status(404); throw new Error('Job not found'); }

        if (resume.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Unauthorized to access this resume');
        }

        // Check if application exists
        let application = await Application.findOne({
             user: req.user.id,
             job: jobId,
             resume: resumeId 
        });

        // Requirement says "Prevent re-analysis spam (one analysis per application)"
        // If we want to strictly attach to an application, we should ensure it exists.
        // Or create one? Use case "Analyze" usually implies before applying or after.
        // Assuming "Application" model tracks the relation.
        // If no application yet, we can either create one or purely analyze.
        // For now, let's look for an existing application. If not found, we can't save results to strict "Application" document easily 
        // unless we create it.
        // BUT, usually users might want to analyze BEFORE applying.
        // However, the requirements said "Save analysis result inside Application document".
        // Let's assume the user has Applied or we treat this as a draft Application.
        // To be safe and follow instructions about saving to Application document, 
        // I will require an Application to exist OR create a new one with status 'Applied' or maybe just 'Applied' if not exists?
        // Prompt says "prevent re-analysis".
        // Let's assume we proceed only if application exists to update it.
        // OR allow creating one. Let's stick to: Update if exists. 
        // If not exists, technically we can't save to Application document.
        // Actually, let's create it if missing to allow analysis before "formal" apply? 
        // No, typically you apply first.
        // Let's proceed: Find Application. If not found, return 400 "Please apply first" or create?
        // Let's just create/find.
        
        if (!application) {
             // For this feature, maybe auto-create or error?
             // Let's error for now as "Apply" usually comes first or is separate. 
             // BUT, "Analyze how well a resume matches...". Maybe simply Return analysis without saving if no app?
             // Instructions: "Save analysis result inside Application document".
             // So application MUST exist.
             res.status(404);
             throw new Error('Application not found. Please apply to the job first.');
        }

        // Limit one analysis per reasonable timeframe? Or just simple overwrite?
        // "Prevent re-analysis spam"
        if (application.analyzedAt) {
             const ONE_HOUR = 60 * 60 * 1000;
             if (new Date() - new Date(application.analyzedAt) < ONE_HOUR) {
                 res.status(429);
                 throw new Error('Analysis already performed recently. Please wait before retrying.');
             }
        }

        // 2. Construct Prompt
        const prompt = `
            Act as a strict ATS (Applicant Tracking System).
            Compare the Resume against the Job Description.

            JOB TITLE: ${job.title}
            JOB DESCRIPTION: ${job.description}
            REQUIRED SKILLS: ${job.skills.join(', ')}
            EXPERIENCE LEVEL: ${job.experienceLevel}

            RESUME CONTENT:
            ${JSON.stringify(resume.content).substring(0, 15000)}

            TASK:
            1. Calculate an ATS Score (0-100) based on keyword matching, relevance, and experience alignment.
            2. Identify matched keywords (present in both).
            3. Identify missing keywords (critical for job but missing in resume).
            4. List key strengths of the resume for this role.
            5. Provide actionable suggestions to improve the score.

            OUTPUT FORMAT:
            Strict JSON object only. No markdown. No text.
            {
              "atsScore": number,
              "matchedKeywords": ["string"],
              "missingKeywords": ["string"],
              "strengths": ["string"],
              "suggestions": ["string"]
            }
        `;

        // 3. Call Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 4. Parse JSON
        let analysisData;
        try {
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            analysisData = JSON.parse(cleanedText);
        } catch (e) {
            console.error('AI Analysis Parse Error', e);
            console.log('Raw Text:', text);
            // Fallback
            analysisData = {
                atsScore: 0,
                matchedKeywords: [],
                missingKeywords: [],
                strengths: ['Error parsing AI response'],
                suggestions: ['Please try again later']
            };
        }

        // 5. Update Application
        application.atsScore = analysisData.atsScore || 0;
        application.matchedKeywords = analysisData.matchedKeywords || [];
        application.missingKeywords = analysisData.missingKeywords || [];
        application.strengths = analysisData.strengths || [];
        application.suggestions = analysisData.suggestions || [];
        application.analyzedAt = Date.now();

        await application.save();

        res.json({
            success: true,
            analysis: analysisData
        });

    } catch (error) {
        console.error('AI Analysis Error:', error);
        next(error);
    }
};

const chat = async (req, res, next) => {
    try {
        const { message, previousMessages } = req.body;

        if (!message) {
            res.status(400);
            throw new Error('Message is required');
        }

        // Construct context using previous messages (limit history to last 5 exchanges to save tokens)
        // previousMessages structure: [{ role: 'user'|'model', parts: [{ text: "..." }] }] or simplified
        // We will assume frontend sends a simplified array and we format it for Gemini if needed, 
        // or just append to prompt for simple single-turn-ish context if doing simplified.
        
        // Let's support a simple stateless chat for now where context is passed in prompt
        // OR better: use Gemini's chat history feature if `previousMessages` is passed formatted.
        // For simplicity and robustness with "local fallback", we'll treat it as a fresh prompt with context.

        try {
            if (!process.env.GEMINI_API_KEY) throw new Error("No API Key");

            const chatSession = model.startChat({
                history: previousMessages || [],
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chatSession.sendMessage(message);
            const response = await result.response;
            const text = response.text();

            return res.status(200).json({
                success: true,
                reply: text,
                source: 'ai'
            });

        } catch (aiError) {
            console.warn("AI Chat failed, falling back to local:", aiError.message);
            
            // Local Fallback Chat Logic
            const lowerMsg = message.toLowerCase();
            let reply = "I'm currently in offline mode. I can help with general questions.";

            if (lowerMsg.includes('resume') || lowerMsg.includes('cv')) {
                reply = "For resumes, focus on quantifiable achievements and tailoring keywords to the job description.";
            } else if (lowerMsg.includes('interview')) {
                reply = "For interviews, practice the STAR method (Situation, Task, Action, Result) to answer behavioral questions.";
            } else if (lowerMsg.includes('salary') || lowerMsg.includes('negotiation')) {
                reply = "Research industry standards for your role and location before negotiating. Don't be afraid to ask for what you're worth.";
            } else if (lowerMsg.includes('skill') || lowerMsg.includes('technolog')) {
                reply = "Top in-demand skills currently include React, Node.js, Python, AWS, and Data Analysis.";
            } else {
                 reply = "That's an interesting topic! As an AI assistant, I recommend checking our 'Keywords' tool to optimize your application.";
            }

            return res.status(200).json({
                success: true,
                reply,
                source: 'local_fallback'
            });
        }

    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateKeywords,
    analyzeResume,
    chat // Exporting the new function
};
