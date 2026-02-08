import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Chunk from "./src/models/Chunks.js";
import { queryVectors } from "./src/utils/vectordbClient.js";
import fs from "fs";

async function testQuery() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        let output = "✅ Connected to MongoDB\n";

        const notebookId = "6988935a07c717b7df5ee28b"; // From db_check_output.txt
        const question = "What is this document about?";

        output += `\n🔍 Testing query for Notebook ID: ${notebookId}\n`;
        output += `❓ Question: "${question}"\n`;

        // 1. Query Pinecone
        output += "\n--- Step 1: Querying Pinecone ---\n";
        const matches = await queryVectors(question, 6, { notebookId });
        output += `🔍 Found ${matches.length} matches in Pinecone.\n`;

        matches.forEach((m, i) => {
            output += `  ${i + 1}. ID: ${m.id}, Score: ${m.score}\n`;
            output += `     Metadata: ${JSON.stringify(m.metadata)}\n`;
        });

        if (matches.length === 0) {
            output += "⚠️ No matches found in Pinecone. Check embedding or notebookId filter.\n";
            fs.writeFileSync("query_test_output.txt", output);
            return;
        }

        // 2. Fetch Chunks from MongoDB
        output += "\n--- Step 2: Fetching Chunks from MongoDB ---\n";
        const vectorIds = matches.map((m) => m.id);
        const chunks = await Chunk.find({ vectorId: { $in: vectorIds } });
        output += `🔍 Found ${chunks.length} chunks in MongoDB.\n`;

        chunks.forEach((c, i) => {
            output += `  ${i + 1}. Chunk ID: ${c._id}\n`;
            output += `     Vector ID: ${c.vectorId}\n`;
            output += `     Text Preview: ${c.text.substring(0, 100)}...\n`;
            output += `     Full Text: ${c.text}\n\n`;
        });

        if (chunks.length === 0) {
            output += "⚠️ No chunks found in MongoDB for the returned Vector IDs. Check Vector ID format mismatch.\n";
        }

        fs.writeFileSync("query_test_output.txt", output);
        console.log("Output written to query_test_output.txt");

    } catch (error) {
        console.error("❌ Error testing query:", error);
    } finally {
        await mongoose.disconnect();
    }
}

testQuery();
