import { getYoutubeTranscript } from "./src/utils/youtube.js";

async function testSpecificVideo() {
    const videoId = "eV-GlKSUEt0"; // The video user reported failing
    console.log(`Testing extraction for: ${videoId}`);

    try {
        const transcript = await getYoutubeTranscript(videoId);
        if (transcript) {
            console.log("✅ Success! Transcript length:", transcript.join(" ").length);
        } else {
            console.log("❌ Failed: Returned null/empty");
        }
    } catch (e) {
        console.error("❌ Exception:", e);
        if (e.cause) console.error("Cause:", e.cause);
    }
}

testSpecificVideo();
