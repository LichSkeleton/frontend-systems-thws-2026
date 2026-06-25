import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";
import { TILTS, RECENT_TILTS } from "../data/notes";
import { useNotes } from "../context/NotesContext";
import {
  CreateNoteOverlay,
  DeleteNoteOverlay,
  EditNoteOverlay,
  SinglePostOverlay,
} from "../components/NoteOverlays.jsx";
import "../styles/views.css";
import { useState } from "react";

export default function HomePage() {
  const { notes, handleAdd, handleDelete, handleSave, handleVote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeView, setActiveView] = useState(null);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null;

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
