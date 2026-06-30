import { useState } from "react";
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

export default function MyNotesPage() {
  const { allNotes, handleAdd, handleDelete, handleSave, currentUser } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeView, setActiveView] = useState(null);

  const myNotes = allNotes.filter((n) => n.author === currentUser);
  const selectedNote = allNotes.find((n) => n.id === selectedNoteId) ?? null;

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
          <div className="section-heading">
            <h2>My Notes</h2>
            <span className="section-sub">
              {myNotes.length === 0
                ? `No notes yet, ${currentUser}`
                : `${myNotes.length} note${myNotes.length !== 1 ? "s" : ""} by ${currentUser}`}
            </span>
          </div>
          <div className="corkboard">
            {myNotes.length > 0 ? (
              myNotes.map((note, i) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  tiltDeg={RECENT_TILTS[i % RECENT_TILTS.length]}
                  onClick={() => handleSingleViewClick(note)}
                                  />
              ))
            ) : (
              <p className="search-empty">
                You haven&apos;t posted any notes yet. Hit + Post Note to get started!
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
