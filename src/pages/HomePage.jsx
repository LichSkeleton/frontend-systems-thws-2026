import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";
import { NOTES, TILTS, RECENT_TILTS } from "../data/notes";
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

  const handleSave = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    closeView();
  };

  const handleVote = (id, next, prev) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) return note;
        const updated = { ...note };
        if (next) updated[next] = note[next] + 1;
        if (prev) updated[prev] = note[prev] - 1;
        return updated;
      })
    );
  };

  return (
    <>
      <Header variant="home" onCreateNote={() => setActiveView("create")} />
      <main style={{ flex: 1 }}>
        <section className="board-section">
          <div className="corkboard" id="mainBoard">
            <div className="board-ribbon">Top Complaints</div>
            {[...notes].sort((a, b) => (b.up - b.down) - (a.up - a.down)).slice(0, 5).map((note, i) => (
              <StickyNote
                key={note.id}
                note={note}
                tiltDeg={TILTS[i]}
                onClick={() => handleSingleViewClick(note)}
                onVote={(next, prev) => handleVote(note.id, next, prev)}
              />
            ))}
            <div className="board-ribbon">Recent Posts</div>
            {[...notes].sort((a, b) => new Date(b.date) - new Date(a.date)).map((note, i) => (
              <StickyNote
                key={note.id}
                note={note}
                tiltDeg={RECENT_TILTS[i % RECENT_TILTS.length]}
                onClick={() => handleSingleViewClick(note)}
                onVote={(next, prev) => handleVote(note.id, next, prev)}
              />
            ))}
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
      {activeView === "create" && <CreateNoteOverlay onClose={closeView} onAdd={handleAdd} />}
      {activeView === "edit" && (
        <EditNoteOverlay note={selectedNote} onClose={closeView} onSave={handleSave} />
      )}
      {activeView === "delete" && (
        <DeleteNoteOverlay note={selectedNote} onClose={closeView} onConfirm={handleDelete} />
      )}
    </>
  );
}
