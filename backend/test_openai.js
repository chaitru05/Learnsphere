import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

console.log("Testing OpenAI API Key...");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function test() {
    try {
        console.log("Sending request to gpt-3.5-turbo...");
        const completion = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello" }],
        });
        console.log("Success:", completion.choices[0].message.content);
    } catch (error) {
        console.error("Error Status:", error.status);
        console.error("Error Type:", error.type);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
    }
}

test();
