import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testDim() {
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-embedding-001" });

        console.log("Testing with output_dimensionality: 768...");
        // Not all models support this, and SDK might pass it in generationConfig or second arg
        // For embedContent, it's usually part of the request object, but SDK method signature is:
        // embedContent(content, taskType?, title?) -> no, wait.
        // It's embedContent(request) where request has content and outputDimensionality?

        // Let's try passing the object structure
        const result = await model.embedContent({
            content: { role: "user", parts: [{ text: "test" }] },
            outputDimensionality: 768
        });

        console.log(`Length: ${result.embedding.values.length}`);
    } catch (e) {
        console.error("Failed:", e.message);
    }
}

testDim();
