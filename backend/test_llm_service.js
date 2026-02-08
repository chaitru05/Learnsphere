import { generateStudyMaterial } from "./service/llmService.js";
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
        console.log("Successfully generated study material!");
        console.log("Notes length:", result.notes.length);
        console.log("Flashcards count:", result.flashcards.length);
        console.log("Quiz questions count:", result.quiz.length);
        console.log("Diagram:", result.diagram);
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
