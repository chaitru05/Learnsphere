"use client";

import "./Sidebar.css";
import { FileText, Trash2, Plus } from "lucide-react";

export default function Sidebar({ notebooks, onSelectNotebook, selectedNotebook, onNewNotebook }) {
  return (
    <div className="sidebar-3">
      <div className="sidebar-header-3">
        <h1 className="sidebar-title-3">Notebooks</h1>
      </div>

      <div className="sources-list-3">
        {notebooks?.map((nb) => (
          <div
            key={nb.id}
            className={`source-item-3 ${selectedNotebook?.id === nb.id ? "active-3" : ""}`}
            onClick={() => onSelectNotebook(nb)}
          >
            <div className="source-icon-3">
              <FileText size={18} />
            </div>

            <div className="source-info-3">
              <p className="source-title-3">{nb.name}</p>
              <span className="source-type-3">{nb.sources?.length || 0} sources</span>
            </div>

            <button className="delete-btn-3" title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-footer-3">
        <button className="new-chat-btn-3" onClick={onNewNotebook}>
          <Plus size={18} />
          New Notebook
        </button>
      </div>
    </div>
  );
}
