import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Source from "./src/models/Source.js";
import { processIngestionJob } from "./src/utils/ingestionProcessor.js";

async function testIngestionWorker() {
    console.log("🚀 Starting Ingestion Worker Simulation...");

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // 1. Create a Dummy Source (Simulating what upload.js does now)
        const notebookId = "6988935a07c717b7df5ee28b"; // Existing notebook ID
        const testUrl = "https://example.com";

        console.log("\n--- Simulating Website Ingestion ---");
        const src = await Source.create({
            notebookId,
            type: "url", // The fixed upload.js will send this
            originalName: testUrl,
            status: "pending",
            metadata: { url: testUrl }
        });
        console.log(`✅ Created Dummy Source: ${src._id}`);

        // 2. Run Processor directly
        console.log("▶ Running processIngestionJob...");
        await processIngestionJob({
            sourceId: src._id,
            notebookId,
            url: testUrl,
            text: null,
            filePath: null
        });

        // 3. Verify Result
        const updatedSrc = await Source.findById(src._id);
        console.log(`\n🔍 Source Status: ${updatedSrc.status}`);
        console.log(`   Metadata:`, updatedSrc.metadata);

        if (updatedSrc.status === "ingested") {
            console.log("✅ Website Ingestion Successful!");
        } else {
            console.error("❌ Website Ingestion Failed!");
        }

    } catch (error) {
        console.error("❌ Error during simulation:", error);
    } finally {
        await mongoose.disconnect();
    }
}

testIngestionWorker();
