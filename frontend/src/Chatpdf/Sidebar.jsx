"use client";

import { useState } from "react";
import "./Sidebar.css";
import { FileText, Trash2, Plus, ChevronDown, ChevronRight, Play, Globe } from "lucide-react";

export default function Sidebar({ notebooks, onSelectNotebook, selectedNotebook, onNewNotebook, onSelectSource, selectedSource }) {
  const [expandedNotebooks, setExpandedNotebooks] = useState({});

  const toggleNotebook = (e, notebookId) => {
    e.stopPropagation();
    setExpandedNotebooks(prev => ({
      ...prev,
      [notebookId]: !prev[notebookId]
    }));
  };

  return (
    <div className="sidebar-3">
      <div className="sidebar-header-3">
        <h1 className="sidebar-title-3">Notebooks</h1>
      </div>

      <div className="sources-list-3">
        {notebooks?.map((nb) => (
          <div key={nb._id || nb.id} className="notebook-container">
            <div
              className={`source-item-3 ${selectedNotebook?.id === (nb._id || nb.id) ? "active-3" : ""}`}
              onClick={() => onSelectNotebook(nb)}
            >
              <div className="source-icon-3">
                <FileText size={18} />
              </div>

              <div className="source-info-3">
                <p className="source-title-3">{nb.name}</p>
                <span className="source-type-3">{nb.sources?.length || 0} sources</span>
              </div>

              <button
                className="expand-btn"
                onClick={(e) => toggleNotebook(e, nb._id || nb.id)}
              >
                {expandedNotebooks[nb._id || nb.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              <button className="delete-btn-3" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>

            {expandedNotebooks[nb._id || nb.id] && (
              <div className="notebook-sources-list">
                {nb.sources?.map(source => (
                  <div
                    key={source._id}
                    className={`notebook-source-item ${selectedSource?._id === source._id ? 'active-source' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSource(source);
                    }}
                  >
                    <span className="source-icon-small">
                      {source.type === 'pdf' ? <FileText size={14} /> :
                        source.type === 'youtube' ? <Play size={14} /> :
                          <Globe size={14} />}
                    </span>
                    <span className="source-name-small" title={source.originalName}>{source.originalName}</span>
                  </div>
                ))}
                {(!nb.sources || nb.sources.length === 0) && (
                  <div className="no-sources-msg">No sources</div>
                )}
              </div>
            )}
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
