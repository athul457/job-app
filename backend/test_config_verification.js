
require('dotenv').config();
const model = require('./config/gemini');

async function testConfiguredModel() {
    try {
        console.log("Testing configured model...");
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hello" }],
                },
            ],
        });
        const result = await chat.sendMessage("Hello again");
        const response = await result.response;
        const text = response.text();
        console.log("Success! Response: ", text);
    } catch (e) {
        console.error("Error testing model:", e);
    }
}

testConfiguredModel();
