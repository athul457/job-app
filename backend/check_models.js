
require('dotenv').config();

// Polyfill fetch if needed, though Node 18+ has it.
// If this fails, we'll see an error.


const fs = require('fs');

async function checkModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) { 
        console.log("No GEMINI_API_KEY found in environment."); 
        return; 
    }
    
    console.log("Checking models for provided API key...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const err = `HTTP Error: ${response.status} ${response.statusText}`;
            console.error(err);
            fs.writeFileSync('models_safe.txt', err);
            return;
        }
        const data = await response.json();
        let output = "";
        if (data.models) {
            output += "Available models:\n";
            data.models.forEach(m => {
                output += `- ${m.name} (methods: ${m.supportedGenerationMethods})\n`;
            });
        } else {
            output += "No models field in response: " + JSON.stringify(data);
        }
        fs.writeFileSync('models_safe.txt', output);
        console.log("Wrote models to models_safe.txt");
    } catch (e) {
        console.error("Fetch error:", e);
        fs.writeFileSync('models_safe.txt', "Fetch error: " + e.message);
    }
}

checkModels();

