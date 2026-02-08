import express from "express";
import multer from "multer";
import Source from "../models/Source.js";
import { ingestionQueue } from "../workers/Ingestionqueue.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure tmp/uploads exists
const uploadDir = path.join(__dirname, "../../tmp/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("📂 processing new upload...");
    console.log("📂 Body:", req.body);

    const { notebookId, sourceType, url, text } = req.body;
    const file = req.file;

    if (file) {
      console.log("📂 File received:", file.originalname, file.path);
    }

    // Upload PDF to Cloudinary only if present
    let storedPath = null;
    if (file) {
      const uploaded = await uploadToCloudinary(file.path);
      storedPath = uploaded.url;
    }

    // ⭐ NORMALIZE TYPE: 'website' -> 'url'
    let type = sourceType;
    if (type === "website") type = "url";

    // Fallback detection
    if (!type) {
      type = file ? "pdf" : url ? (url.includes("youtu") ? "youtube" : "url") : text ? "text" : "unknown";
    }

    console.log(`📂 Final Source Type: ${type}`);

    // Create the source entry
    const src = await Source.create({
      notebookId,
      type,
      originalName: file ? file.originalname : url || "pasted_text",
      storagePath: storedPath, // Cloudinary URL or null
      status: "pending",
      metadata: { url },
    });

    console.log(`✅ Source created: ${src._id}`);

    // QUEUE THE INGESTION
    await ingestionQueue.add("ingest", {
      sourceId: src._id.toString(),
      notebookId,
      filePath: file ? file.path : null,
      url: url || null,
      text: text || null,
    });

    return res.json({ ok: true, sourceId: src._id });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
