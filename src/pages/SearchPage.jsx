import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";
import { RECENT_TILTS } from "../data/notes";
import { useNotes } from "../context/NotesContext";
import {
  CreateNoteOverlay,
  DeleteNoteOverlay,
  EditNoteOverlay,
  SinglePostOverlay,
} from "../components/NoteOverlays.jsx";
import "../styles/views.css";

function filterNotes(notes, query) {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(term) ||
      note.description.toLowerCase().includes(term)
  );
}

export default function SearchPage() {
  const { notes, handleAdd, handleDelete, handleSave, handleVote } = useNotes();
  const [query, setQuery] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeView, setActiveView] = useState(null);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null;
  const results = useMemo(() => filterNotes(notes, query), [notes, query]);
  const trimmedQuery = query.trim();

  const closeView = () => setActiveView(null);

  const handleSingleViewClick = (note) => {
    setSelectedNoteId(note.id);
    setActiveView("single");
  };

  const handleAddNote = (newNote) => {
    handleAdd(newNote);
    closeView();
  };

  const handleDeleteNote = (id) => {
    handleDelete(id);
    closeView();
  };

  const handleSaveNote = (updatedNote) => {
    handleSave(updatedNote);
    closeView();
  };

  return (
    <>
      <Header onCreateNote={() => setActiveView("create")} />
      <main style={{ flex: 1 }}>
        <section className="board-section search-section">
          <div className="section-heading">
            <h2>Search Notes</h2>
            <span className="section-sub">Find complaints by keyword</span>
          </div>

          <form
            className="search-bar"
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <label htmlFor="note-search" className="search-label">
              Search
            </label>
            <div className="search-input-wrap">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                id="note-search"
                type="search"
                className="search-input"
                placeholder="Search titles and descriptions..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              )}
            </div>
          </form>

          <div className="corkboard search-results-board">
            {trimmedQuery ? (
              <>
                <div className="board-ribbon">
                  {results.length === 1
                    ? `1 match for “${trimmedQuery}”`
                    : `${results.length} matches for “${trimmedQuery}”`}
                </div>
                {results.length > 0 ? (
                  results.map((note, i) => (
                    <StickyNote
                      key={note.id}
                      note={note}
                      tiltDeg={RECENT_TILTS[i % RECENT_TILTS.length]}
                      onClick={() => handleSingleViewClick(note)}
                      onVote={(next, prev) => handleVote(note.id, next, prev)}
                    />
                  ))
                ) : (
                  <p className="search-empty">No notes match your search. Try another keyword.</p>
                )}
              </>
            ) : (
              <p className="search-empty search-hint">
                Start typing to search across all note titles and descriptions.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      {activeView === "single" && (
        <SinglePostOverlay
          note={selectedNote}
          onClose={closeView}
          onEdit={() => setActiveView("edit")}
          onDelete={() => setActiveView("delete")}
          onVote={(next, prev) => handleVote(selectedNoteId, next, prev)}
        />
      )}
      {activeView === "create" && (
        <CreateNoteOverlay onClose={closeView} onAdd={handleAddNote} />
      )}
      {activeView === "edit" && (
        <EditNoteOverlay note={selectedNote} onClose={closeView} onSave={handleSaveNote} />
      )}
      {activeView === "delete" && (
        <DeleteNoteOverlay
          note={selectedNote}
          onClose={closeView}
          onConfirm={handleDeleteNote}
        />
      )}
    </>
  );
}
