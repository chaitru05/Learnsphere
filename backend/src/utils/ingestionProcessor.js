import Source from "../models/Source.js";
import Chunk from "../models/Chunks.js";
import fs from "fs";
import { extractFromPDF, extractFromUrl, extractFromYoutube } from "./extractors.js";
import { chunkText } from "./chunker.js";
import { upsertVectors } from "./vectordbClient.js";
import { embedWithGemini } from "./vectordbClient.js"; // <-- import embedding function

export async function processIngestionJob(data) {
  const { sourceId, filePath, url, text, notebookId } = data;

  const source = await Source.findById(sourceId);
  let rawText = text || "";

  // 1️⃣ Extract Text
  if (source.type === "pdf" && filePath) rawText = await extractFromPDF(filePath);
  else if (source.type === "url" && url) rawText = await extractFromUrl(url);
  else if (source.type === "youtube" && url) rawText = await extractFromYoutube(url);

  rawText = rawText.replace(/\s+/g, " ").trim();

  if (!rawText || rawText.length < 50) {
    console.error("❌ Extraction failed or content too short:", rawText);
    await Source.findByIdAndUpdate(sourceId, {
      status: "failed",
      metadata: { error: "Could not extract content from source." }
    });
    return;
  }

  // 2️⃣ Chunk Text
  const chunks = chunkText(rawText, 1500, 300);
  console.log("🔍 Raw extracted text length:", rawText.length);
  console.log("🔍 Chunk count:", chunks.length);

  // 3️⃣ Generate Gemini Embeddings for each chunk
  console.log("🧠 Generating embeddings for", chunks.length, "chunks...");
  const embeddings = [];
  for (let chunk of chunks) {
    const emb = await embedWithGemini(chunk);
    embeddings.push(emb);
  }
  console.log("✔ Embeddings generated!");

  // 4️⃣ Prepare vectors for Pinecone (NOT integrated mode)
  const vectors = chunks.map((chunk, i) => ({
    id: `${sourceId}_chunk_${i}`,
    values: embeddings[i],   // <-- REAL embedding goes here
    metadata: {
      text: chunk,
      sourceId: sourceId.toString(),
      notebookId: notebookId.toString(),
      chunkIndex: i,
    },
  }));

  // 5️⃣ Upsert vectors
  await upsertVectors(vectors);
  console.log("✔ Stored", vectors.length, "vectors in Pinecone");

  // 6️⃣ Save chunks in Mongo
  const chunkDocs = chunks.map((chunk, i) => ({
    sourceId,
    notebookId,
    text: chunk,
    chunkIndex: i,
    vectorId: `${sourceId}_chunk_${i}`,
  }));

  await Chunk.insertMany(chunkDocs);

  // 7️⃣ Update source as ingested
  await Source.findByIdAndUpdate(sourceId, {
    status: "ingested",
    metadata: { length: rawText.length },
  });

  // 8️⃣ Delete uploaded file
  if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);

  console.log("✅ Ingestion complete!");
}
