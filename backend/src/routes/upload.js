import express from "express";
import multer from "multer";
import Source from "../models/Source.js";
import { ingestionQueue } from "../workers/Ingestionqueue.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const router = express.Router();

const upload = multer({ dest: "/tmp/uploads" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { notebookId, sourceType, url, text } = req.body;
    const file = req.file; // ⭐ file is available HERE

    // Upload PDF to Cloudinary only if present
    let storedPath = null;
if (file) {
  const uploaded = await uploadToCloudinary(file.path);
  storedPath = uploaded.url;
}


    const type =
      sourceType || (file ? "pdf" : url ? "url" : text ? "text" : "unknown");

    // Create the source entry
    const src = await Source.create({
      notebookId,
      type,
      originalName: file ? file.originalname : url || "pasted_text",
      storagePath: storedPath, // ⭐ Cloudinary URL or null
      status: "pending",
      metadata: { url },
    });

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
