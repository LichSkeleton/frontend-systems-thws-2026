import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";
import RecentCard from "../components/RecentCard";
import { NOTES, TILTS } from "../data/notes";
import {
  CreateNoteOverlay,
  DeleteNoteOverlay,
  EditNoteOverlay,
  SinglePostOverlay,
} from "../components/NoteOverlays.jsx";
import { useState } from "react";

export default function HomePage() {
  const [notes, setNotes] = useState(NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeView, setActiveView] = useState(null);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null;

  const closeView = () => setActiveView(null);

  const handleSingleViewClick = (note) => {
    setSelectedNoteId(note.id);
    setActiveView("single");
  };

  const handleAdd = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    closeView();
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    closeView();
  };

  const handleVote = (id, direction) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, [direction]: note[direction] + 1 } : note
      )
    );
  };

  return (
    <>
      <Header variant="home" onCreateNote={() => setActiveView("create")} />
      <main style={{ flex: 1 }}>
        <section id="top-section" className="board-section">
          <div className="section-heading">
            <h2>Top Complaints</h2>
            <span className="section-sub">Most popular this week</span>
          </div>
          <div className="corkboard" id="popularBoard">
            {notes.slice(0, 5).map((note, i) => (
              <StickyNote
                key={note.id}
                note={note}
                rank={i + 1}
                tiltDeg={TILTS[i]}
                onClick={() => handleSingleViewClick(note)}
                onVoteUp={() => handleVote(note.id, "up")}
                onVoteDown={() => handleVote(note.id, "down")}
              />
            ))}

          </div>
        </section>

        <div className="divider">
          <span>Recent Notes</span>
        </div>

        <section id="recent-section" className="board-section">
          <div className="section-heading">
            <h2>Recent Posts</h2>
            <span className="section-sub">Freshly pinned to the board</span>
          </div>
          <div className="recent-grid" id="recentBoard">
            {notes.map((note) => (
              <RecentCard
                key={note.id}
                note={note}
                onClick={() => handleSingleViewClick(note)}
                onVoteUp={() => handleVote(note.id, "up")}
                onVoteDown={() => handleVote(note.id, "down")}
              />
            ))}
          </div>
          <div className="pagination">
            <button type="button" className="page-btn disabled" disabled>
              ← Prev
            </button>
            <span className="page-info">Page 1 of 1</span>
            <button type="button" className="page-btn disabled" disabled>
              Next →
            </button>
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
          onVoteUp={() => handleVote(selectedNoteId, "up")}
          onVoteDown={() => handleVote(selectedNoteId, "down")}
        />
      )}
      {activeView === "create" && <CreateNoteOverlay onClose={closeView} onAdd={handleAdd} />}
      {activeView === "edit" && (
        <EditNoteOverlay note={selectedNote} onClose={closeView} />
      )}
      {activeView === "delete" && (
        <DeleteNoteOverlay note={selectedNote} onClose={closeView} onConfirm={handleDelete} />
      )}
    </>
  );
}
