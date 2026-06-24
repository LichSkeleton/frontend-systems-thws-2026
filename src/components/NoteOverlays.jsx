import { useState } from "react";
import VoteButtons from "./VoteButtons";
import { formatDate } from "../utils/formatDate";

export function SinglePostOverlay({ note, onClose, onEdit, onDelete, onVoteUp, onVoteDown }) {
  if (!note) return null;

  return (
    <div className="live-view-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className={`note-modal note-${note.color}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`note-title-${note.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="note-modal-close" aria-label="Close" onClick={onClose}>
          x
        </button>
        <span className="note-modal-tag">Single post</span>
        <h2 className="note-modal-title" id={`note-title-${note.id}`}>
          {note.title}
        </h2>
        <p className="note-modal-body">{note.description}</p>
        <div className="note-modal-footer">
          <VoteButtons
            up={note.up}
            down={note.down}
            onVoteUp={onVoteUp}
            onVoteDown={onVoteDown}
          />
          <span className="note-date">{formatDate(note.date)}</span>
          <div className="note-modal-actions">
            <button type="button" className="btn-edit-sm" onClick={onEdit}>
              Edit
            </button>
            <button type="button" className="btn-delete-sm" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const COLORS = ["yellow", "pink", "blue", "green", "orange", "purple"];

export function CreateNoteOverlay({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("yellow");

  const handlePost = () => {
    if (!title.trim()) return;
    onAdd({
      id: Date.now(),
      title: title.trim(),
      description: body.trim(),
      color,
      up: 0,
      down: 0,
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="live-view-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className={`create-note-modal note-${color}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-note-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="note-modal-close" aria-label="Close" onClick={onClose}>
          x
        </button>
        <span className="create-note-hint">New complaint</span>
        <input
          className="note-input note-input-title"
          type="text"
          id="create-note-title"
          placeholder="Give it a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="note-input note-input-body"
          placeholder="What happened? Tell the board..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="create-note-footer">
          <div className="note-swatch-row">
            <span className="note-swatch-label">Color:</span>
            {COLORS.map((c) => (
              <span
                key={c}
                className={`swatch swatch-${c}${color === c ? " selected" : ""}`}
                title={c}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <div className="create-note-actions">
            <button type="button" className="btn-note-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn-note-save" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditNoteOverlay({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="live-view-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className={`note-modal note-${note.color}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`edit-note-title-${note.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="note-modal-close" aria-label="Close" onClick={onClose}>
          x
        </button>
        <span className="note-modal-tag">Editing your note</span>
        <input
          className="note-input note-input-title"
          type="text"
          id={`edit-note-title-${note.id}`}
          defaultValue={note.title}
          readOnly
        />
        <div className="note-input note-input-body">{note.description}</div>
        <div className="note-modal-edit-footer">
          <div className="note-swatch-row">
            <span className="note-swatch-label">Color:</span>
            <span className={`swatch swatch-${note.color} selected`} title={note.color} />
          </div>
          <div className="note-edit-actions">
            <button type="button" className="btn-note-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn-note-save" onClick={onClose}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeleteNoteOverlay({ note, onClose, onConfirm }) {
  if (!note) return null;

  return (
    <div className="live-view-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className={`note-modal note-${note.color}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`delete-note-title-${note.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="note-modal-close" aria-label="Close" onClick={onClose}>
          x
        </button>
        <div className="note-delete-body">
          <span className="delete-icon">Delete</span>
          <h2 className="delete-question" id={`delete-note-title-${note.id}`}>
            Remove "{note.title}"?
          </h2>
          <p className="delete-subtext">This cannot be undone.</p>
          <div className="delete-note-actions">
            <button type="button" className="btn-keep" onClick={onClose}>
              Keep it
            </button>
            <button type="button" className="btn-confirm-delete" onClick={() => onConfirm(note.id)}>
              Yes, delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
