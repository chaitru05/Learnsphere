import dotenv from "dotenv";
dotenv.config();
import { queryVectors } from "./src/utils/vectordbClient.js";

import fs from "fs";
import util from "util";

const logFile = fs.createWriteStream("search_debug.txt", { flags: "w" });
const logStdout = process.stdout;

console.log = function (...args) {
    logFile.write(util.format.apply(null, args) + "\n");
    logStdout.write(util.format.apply(null, args) + "\n");
};
console.error = function (...args) {
    logFile.write(util.format.apply(null, args) + "\n");
    logStdout.write(util.format.apply(null, args) + "\n");
};

async function testSearch() {
    console.log("Testing search...");
    try {
        const query = "What is this document about?";
        const matches = await queryVectors(query);
        console.log("Matches found:", matches.length);
        if (matches.length > 0) {
            console.log("Top match score:", matches[0].score);
            console.log("Top match metadata:", matches[0].metadata);
        } else {
            console.log("❌ No matches found. Embedding or Query failed.");
        }
    } catch (err) {
        console.error("❌ Search failed:", err);
    }
}
testSearch();
