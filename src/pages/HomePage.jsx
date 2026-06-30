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
  const { paginatedNotes, allNotes, totalNotes, notesPerPage, currentPage, paginate, handleAdd, handleDelete, handleSave } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeView, setActiveView] = useState(null);

  // Find selected note from allNotes to ensure it's always available regardless of pagination
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

  const totalPages = Math.ceil(totalNotes / notesPerPage);

  // Top 5 complaints (always from all notes, sorted by upvotes - downvotes)
  const topComplaints = [...allNotes].sort((a, b) => (b.up - b.down) - (a.up - a.down)).slice(0, 5);

  return (
    <>
      <Header onCreateNote={() => setActiveView("create")} />
      <main style={{ flex: 1 }}>
        <section className="board-section">
          <div className="corkboard" id="mainBoard">
            <div className="board-ribbon">Top Complaints</div>
            {topComplaints.map((note, i) => (
              <StickyNote
                key={note.id}
                note={note}
                tiltDeg={TILTS[i]}
                onClick={() => handleSingleViewClick(note)}
                              />
            ))}
            <div className="board-ribbon">Recent Posts</div>
            {paginatedNotes.map((note, i) => ( // Use the paginated notes for recent posts
              <StickyNote
                key={note.id}
                note={note}
                tiltDeg={RECENT_TILTS[i % RECENT_TILTS.length]}
                onClick={() => handleSingleViewClick(note)}
                              />
            ))}
          </div>
          <div className="pagination-controls">
            <button
              className="btn-pagination"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn-pagination"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
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