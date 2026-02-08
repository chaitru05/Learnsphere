import dotenv from "dotenv";
dotenv.config();

import { embedWithGemini, queryVectors, index } from "./src/utils/vectordbClient.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testRAG() {
    console.log("🚀 Starting RAG Test...");

    // 1. Test Embedding Generation
    const testText = "What is the capital of France?";
    console.log(`\nTesting embedding for: "${testText}"`);

    const embedding = await embedWithGemini(testText);

    if (!embedding || embedding.length === 0) {
        console.error("❌ Embedding generation failed! Array is empty.");
        return;
    }

    console.log(`✅ Embedding generated! Length: ${embedding.length} (Expected: 768)`);

    if (embedding.length !== 768) {
        console.warn("⚠️ Warning: Embedding dimension mismatch. Check your Pinecone index config.");
    }

    // 2. Test Pinecone Query
    console.log("\nTesting Pinecone Query...");
    try {
        const matches = await queryVectors(testText, 5);
        console.log(`✅ Query successful! Found ${matches.length} matches.`);

        matches.forEach((match, i) => {
            console.log(`\nMatch ${i + 1}:`);
            console.log(`- Score: ${match.score}`);
            console.log(`- Text Chunk: ${match.metadata?.text?.substring(0, 100)}...`);
            console.log(`- Source ID: ${match.metadata?.sourceId}`);
        });

    } catch (error) {
        console.error("❌ Pinecone Query failed:", error);
    }

    // 3. Test simple generation to ensure key works for chat
    console.log("\nTesting Gemini Chat Generation...");
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Say hello");
        console.log("✅ Chat Model Works. Response:", result.response.text());
    } catch (e) {
        console.error("❌ Chat Model Failed:", e.message);
    }

    console.log("\n✅ Test Completed.");
    process.exit(0);
}

testRAG();
