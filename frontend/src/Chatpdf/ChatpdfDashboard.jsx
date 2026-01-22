"use client";

import { useState } from "react";
import "./chat.css";
import Sidebar from "./Sidebar";
import ChatSection from "./ChatSection";
import RightPanel from "./RightPanel";
import CreateNotebookModal from "./CreateNotebookModal";
import AddSourceModal from "./AddSourceModal";
import { API_BASE_URL } from "./api";

export default function ChatpdfDashboard() {
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  const [isCreateNotebookOpen, setIsCreateNotebookOpen] = useState(false);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! Upload a PDF or add a link to get started.",
    },
  ]);

  // -------------------------------
  // CREATE NOTEBOOK
  // -------------------------------
  const handleCreateNotebook = async (notebookName) => {
    try {
      const res = await fetch(`${API_BASE_URL}/notebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: notebookName }),
      });

      const nb = await res.json();

      const newNotebook = {
        id: nb._id, // backend ID
        name: nb.name,
        createdDate: nb.createdAt,
        sources: [],
      };

      setNotebooks((prev) => [...prev, newNotebook]);
      setSelectedNotebook(newNotebook);

      setIsCreateNotebookOpen(false);
      setIsAddSourceOpen(true); // open "Add Source"

    } catch (err) {
      console.error("Notebook creation failed:", err);
    }
  };

  // -------------------------------
  // UPLOAD SOURCE
  // -------------------------------
  const handleAddSource = async (source) => {
    try {
      const fd = new FormData();
      fd.append("notebookId", selectedNotebook.id);
      fd.append("sourceType", source.type);

      if (source.type === "pdf") {
        fd.append("file", source.file);
      }

      if (source.type === "website") {
        fd.append("url", source.url);
      }

      if (source.type === "youtube") {
        fd.append("url", source.url);
      }

      if (source.type === "text") {
        fd.append("text", source.text);
      }

      const uploadRes = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: fd,
      });

      const data = await uploadRes.json();
      const sourceId = data.sourceId;

      // -------------------------------
      // ADD SOURCE IN UI
      // -------------------------------
      const updated = notebooks.map((nb) => {
        if (nb.id === selectedNotebook.id) {
          return {
            ...nb,
            sources: [
              ...nb.sources,
              {
                id: sourceId,
                title: source.title,
                type: source.type,
                date: new Date().toISOString().split("T")[0],
              },
            ],
          };
        }
        return nb;
      });

      setNotebooks(updated);
      setIsAddSourceOpen(false);

    } catch (err) {
      console.error("Source upload failed:", err);
    }
  };

  // -------------------------------
  // CHAT MESSAGE
  // -------------------------------
  const handleSendMessage = async (text) => {
    const userMessage = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(
        `${API_BASE_URL}/query/${selectedNotebook.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: text, mode: "answer" }),
        }
      );

      const data = await res.json();

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.answer || "No answer found.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "❌ Backend not responding.",
        },
      ]);
    }
  };

  return (
    <div className="chat-pdf-container-3">
      <Sidebar
        sources={selectedNotebook?.sources || []} // FIXED
        selectedSource={null}
        onSelectSource={() => {}}
        selectedNotebook={selectedNotebook}
        notebooks={notebooks}
        onNewNotebook={() => setIsCreateNotebookOpen(true)}
      />

      <ChatSection
        messages={messages}
        onSendMessage={handleSendMessage}
        onAddSource={() => setIsAddSourceOpen(true)}
        selectedNotebook={selectedNotebook}
      />

      <RightPanel />

      {isCreateNotebookOpen && (
        <CreateNotebookModal
          onClose={() => setIsCreateNotebookOpen(false)}
          onCreate={handleCreateNotebook}
        />
      )}

      {isAddSourceOpen && selectedNotebook && (
        <AddSourceModal
          notebookId={selectedNotebook.id}
          onClose={() => setIsAddSourceOpen(false)}
          onAdd={handleAddSource}
        />
      )}
    </div>
  );
}
