import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Source from "./src/models/Source.js";
import { processIngestionJob } from "./src/utils/ingestionProcessor.js";

async function testYoutubeFailure() {
    console.log("🚀 Starting YouTube Failure Simulation...");

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // 1. Create a Dummy Source for a video with NO captions
        const notebookId = "6988935a07c717b7df5ee28b"; // Existing notebook ID
        // This video ID is likely to fail/not have captions or we can mock it.
        // Let's use the one that failed for the user if possible or a known tricky one.
        // Or better, let's just stick to the flow. 
        // If the previous test_extractors.js worked for "Gangnam style" (which has captions),
        // we need one that doesn't. 
        // "Me at the zoo" (jNQXAC9IVRw) often has manual captions now.
        // Let's try a very new random video or just rely on the fact that if it fails, it prints error.

        // Let's assume the user's video failed. I'll use a random string to force failure if youtube-dl fails pattern matching, 
        // but youtube-transcript checks video ID.

        // Actually, I can use a non-existent video ID to force failure from youtube-transcript
        const testUrl = "https://www.youtube.com/watch?v=ZZZZZZZZZZZ";

        console.log(`\n--- Simulating YouTube Ingestion for: ${testUrl} ---`);
        const src = await Source.create({
            notebookId,
            type: "youtube",
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

        if (updatedSrc.status === "failed") {
            console.log("✅ Correctly handled failure (Status marked as 'failed')");
        } else {
            console.error(`❌ Unexpected status: ${updatedSrc.status} (Expected 'failed')`);
        }

    } catch (error) {
        console.error("❌ Error during simulation:", error);
    } finally {
        await mongoose.disconnect();
    }
}

testYoutubeFailure();
