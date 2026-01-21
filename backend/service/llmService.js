import OpenAI from "openai";
import dotenv from "dotenv";
import JSON5 from "json5"; // Import JSON5 at the top
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateStudyMaterial = async (data) => {
  const { title, subject, goal, academicLevel, difficulty, language, learningStyle, keywords } = data;

  const prompt = `
You are an expert educational assistant that creates **exam-ready, comprehensive, and conceptually rich study materials**.

### Context
Topic: ${title}
Subject: ${subject}
Goal: ${goal}
Academic Level: ${academicLevel}
Difficulty: ${difficulty}
Language: ${language}
Learning Style: ${learningStyle}
Focus Areas: ${keywords.join(", ")}

### Instructions
Create **detailed study materials** that can serve as reliable notes for exam preparation. 
Focus on clarity, structure, conceptual explanations, and real-world relevance.

Generate the following:

1. **Extensive Notes**
    - Well-organized with clear headings and subheadings.
    - Include definitions, formulas, diagrams (in text if needed), examples, and comparisons.
    - Explain core concepts step-by-step.
    - Add real-world applications and common pitfalls or misconceptions.
    - Length should be sufficient for an in-depth understanding (at least 800–1200 words).

2. **10 Flashcards**
    - Concise Q–A pairs covering definitions, examples, and key differences.

3. **10 Quiz Questions**
    - Mix of MCQs, True/False, and short answers.
    - Provide answer and short explanation for each.

4. **Diagram**
    - If relevant, describe or render in text using Mermaid.js format.
    - Keep it readable and labeled.

5. **Course Outline**
    - Suggest 3–6 logical chapters for learning progression.

### Output Format
Output **only** valid JSON that passes a linter. Pay close attention to syntax,
especially commas between array elements and object properties.

{
  "notes": "long and detailed notes as a formatted string with markdown headings and bullet points",
  "flashcards": [{ "question": "...", "answer": "..." }],
  "quiz": [{ "question": "...", "options": ["A","B","C","D"], "answer": "...", "explanation": "..." }],
  "diagram": "...",
  "courseOutline": ["..."]
}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.65,
    response_format: { type: "json_object" },
  });

  let outputText = completion.choices[0].message.content;

  if (!outputText) {
    throw new Error("Received empty response from model");
  }

  // 🧹 Clean up extra markdown wrappers
  outputText = outputText
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  // 🧼 Normalize weird characters & ensure safe JSON parsing
  const sanitized = outputText
    // --- NEW FIX: Replace non-breaking spaces (U+00A0) with regular spaces ---
    // JSON.parse() fails on these, but JSON5 can handle them.
    // It's safer to replace them for all parsers.
    .replace(/\u00A0/g, " ")

    // KEEP THIS: Fixes invalid escape sequences like \[ and \( inside strings
    .replace(/\\(?!["\\/bfnrtu])/g, "\\\\")
    
    // KEEP THIS: Fixes trailing commas
    .replace(/,(\s*[}\]])/g, "$1")
    
    // KEEP THIS: Fixes smart quotes
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .trim();

  // 🧩 Attempt to parse safely
  try {
    return JSON.parse(sanitized);
  } catch (err) {
    console.error("❌ Failed to parse model output (attempt 1 with JSON.parse):\n", sanitized);
    
    // Optional fallback: try a second pass with JSON5 for resilience
    try {
      return JSON5.parse(sanitized);
    } catch (err2) {
      // This is where your "missing comma" error was truly caught, as
      // neither parser could handle it.
      console.error("❌ Failed to parse model output (attempt 2 with JSON5):\n", sanitized);
      throw new Error("Invalid JSON from model after all sanitization attempts");
    }
  }
};