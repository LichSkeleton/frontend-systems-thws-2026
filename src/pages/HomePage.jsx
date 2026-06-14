import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";
import RecentCard from "../components/RecentCard";
import { DISPLAY_NOTES, TILTS } from "../data/notes";

export default function HomePage() {
  return (
    <>
      <Header variant="home" />
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
              <RecentCard key={note.id} note={note} />
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
    </>
  );
}
