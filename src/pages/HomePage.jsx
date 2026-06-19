import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";
import RecentCard from "../components/RecentCard";
import { DISPLAY_NOTES, TILTS } from "../data/notes";
import {
  CreateNoteOverlay,
  DeleteNoteOverlay,
  EditNoteOverlay,
  SinglePostOverlay,
} from "../components/NoteOverlays.jsx";
import { useState } from "react";

export default function HomePage() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeView, setActiveView] = useState(null);

  const handleSingleViewClick = (note) => {
    setSelectedNote(note);
    setActiveView("single");
  };

  const closeView = () => {
    setActiveView(null);
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
            {DISPLAY_NOTES.map((note, i) => (
              <StickyNote
                key={note.id}
                note={note}
                rank={i + 1}
                tiltDeg={TILTS[i]}
                onClick={() => handleSingleViewClick(note)}
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
            {DISPLAY_NOTES.map((note) => (
              <RecentCard
                key={note.id}
                note={note}
                onClick={() => handleSingleViewClick(note)}
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
        />
      )}
      {activeView === "create" && <CreateNoteOverlay onClose={closeView} />}
      {activeView === "edit" && (
        <EditNoteOverlay note={selectedNote} onClose={closeView} />
      )}
      {activeView === "delete" && (
        <DeleteNoteOverlay note={selectedNote} onClose={closeView} />
      )}
    </>
  );
}
