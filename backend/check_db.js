import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Chunk from "./src/models/Chunks.js";
import Source from "./src/models/Source.js";
import fs from "fs";

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        let output = "✅ Connected to MongoDB\n";

        const sources = await Source.find({}).sort({ createdAt: -1 }).limit(5);
        output += `\n🔍 Found ${sources.length} recent sources:\n`;

        for (const source of sources) {
            output += `- Source ID: ${source._id}\n`;
            output += `  Type: ${source.type}\n`;
            output += `  Name: ${source.originalName}\n`;
            output += `  Status: ${source.status}\n`;
            output += `  Notebook ID: ${source.notebookId}\n`;

            const chunkCount = await Chunk.countDocuments({ sourceId: source._id });
            output += `  ✅ Chunks in DB: ${chunkCount}\n`;
        }

        fs.writeFileSync("db_check_output.txt", output);
        console.log("Output written to db_check_output.txt");

    } catch (error) {
        console.error("❌ Error checking data:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkData();
