
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set');
    return;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // There isn't a direct listModels method on the client instance in some versions, 
    // but we can try to inspect or just test a known working one like gemini-pro.
    // Actually, newer SDKs might expose it via a ModelManager or similar.
    // Let's try to just run a simple generateContent with 'gemini-1.5-flash' to see if it reproduces
    // and maybe 'gemini-pro' to comparison.
    
    // NOTE: The error message suggested "Call ListModels". 
    // This is usually a raw REST API call. The SDK might not wrap it directly in the main class.
    // Let's try to use the model and catch the error to print it clearly.
    
    const modelTarget = "gemini-1.5-flash";
    console.log(`Attempting to use model: ${modelTarget}`);
    const model = genAI.getGenerativeModel({ model: modelTarget });
    try {
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash!");
        console.log(result.response.text());
    } catch (e) {
        console.error("Error with gemini-1.5-flash:", e.message);
    }
    
    const modelBackup = "gemini-pro";
    console.log(`\nAttempting to use model: ${modelBackup}`);
    const model2 = genAI.getGenerativeModel({ model: modelBackup });
    try {
        const result2 = await model2.generateContent("Hello");
        console.log("Success with gemini-pro!");
        console.log(result2.response.text());
    } catch (e) {
         console.error("Error with gemini-pro:", e.message);
    }

  } catch (error) {
    console.error('Script Error:', error);
  }
}

listModels();
