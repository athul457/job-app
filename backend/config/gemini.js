const { GoogleGenerativeAI } = require('@google/generative-ai');

// Check for API key
if (!process.env.GEMINI_API_KEY) {
    console.error('FATAL ERROR: GEMINI_API_KEY is not defined.');
    // We don't exit process here to allow other parts of app to run, 
    // but AI features will fail.
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a model that balances speed and quality, e.g., gemini-1.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = model;
