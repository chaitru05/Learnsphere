import dotenv from "dotenv";
dotenv.config();

import { extractFromUrl, extractFromYoutube } from "./src/utils/extractors.js";

async function testExtractors() {
    console.log("🚀 Starting Extractor Tests...");

    // 1. Test Website Extraction
    const testUrl = "https://example.com";
    console.log(`\nTesting Website Extraction for: ${testUrl}`);
    const webText = await extractFromUrl(testUrl);
    console.log(`Result Length: ${webText.length}`);
    console.log(`Preview: ${webText.substring(0, 100)}...`);

    if (webText.length > 0) {
        console.log("✅ Website extraction successful!");
    } else {
        console.error("❌ Website extraction returned empty text.");
    }

    // 2. Test YouTube Extraction
    // Using a video known to have transcripts (e.g., a TED talk or dev tutorial)
    const testYoutube = "https://www.youtube.com/watch?v=jNQXAC9IVRw"; // Me at the zoo (first youtube video - might not have captions, let's use something reliable if this fails)
    // Actually "Me at the zoo" might not have auto-generated captions available via the library if not enabled.
    // Let's use a popular tech video that likely has captions.
    const testYoutube2 = "https://www.youtube.com/watch?v=9bZkp7q19f0"; // Gangnam Style? No music.
    // Let's try a fireship video or something similar.
    const testYoutube3 = "https://www.youtube.com/watch?v=F5mRWCq58lo"; // "The weird history of JavaScript" - Fireship

    console.log(`\nTesting YouTube Extraction for: ${testYoutube3}`);
    try {
        const ytText = await extractFromYoutube(testYoutube3);
        console.log(`Result Length: ${ytText.length}`);
        console.log(`Preview: ${ytText.substring(0, 100)}...`);

        if (ytText && ytText.length > 0) {
            console.log("✅ YouTube extraction successful!");
        } else {
            console.error("❌ YouTube extraction returned empty text.");
        }
    } catch (e) {
        console.error("❌ YouTube extraction threw error:", e);
    }
}

testExtractors();
