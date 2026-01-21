// Real YouTube transcript implementation using the 'youtube-transcript' library
// Install first:  npm install youtube-transcript

import { YoutubeTranscript } from 'youtube-transcript'

export async function getYoutubeTranscript(urlOrId) {
  // extract video id if user passes a full URL
  const idMatch = urlOrId.match(/([\w-]{11})$/)
  const id = idMatch ? idMatch[1] : urlOrId

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(id)
    // transcript = [{ text: "hello", offset: 1, duration: 3 }, ...]
    return transcript.map(t => t.text)
  } catch (err) {
    console.error("YouTube transcript error:", err)
    return ["Transcript unavailable."]
  }
}
