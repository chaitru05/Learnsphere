import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

console.log("Testing Gemini API Key...");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function test() {
    try {
        const prompt = "Explain how AI works in one sentence.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Success:", text);
    } catch (error) {
        console.error("Error Message:", error.message);
    }
}

test();
