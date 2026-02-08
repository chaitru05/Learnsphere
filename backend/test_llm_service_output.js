import { generateStudyMaterial } from "./service/llmService.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const sampleData = {
    title: "Photosynthesis",
    subject: "Biology",
    goal: "Understand the process",
    academicLevel: "High School",
    difficulty: "Intermediate",
    language: "English",
    learningStyle: "Visual",
    keywords: ["chlorophyll", "sunlight", "glucose"]
};

async function test() {
    try {
        console.log("Testing generateStudyMaterial with Gemini...");
        const result = await generateStudyMaterial(sampleData);
        fs.writeFileSync("output.json", JSON.stringify(result, null, 2));
        console.log("Successfully generated study material! Check output.json");
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
