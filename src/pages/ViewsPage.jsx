import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VoteButtons from "../components/VoteButtons";
import { NOTES } from "../data/notes";
import { formatDate } from "../utils/formatDate";
import "../styles/views.css";

const VIEW_TABS = [
  { id: "view-post", label: "1 — Single Post" },
  { id: "view-create", label: "2 — Create Note" },
  { id: "view-edit", label: "3 — Edit Note" },
  { id: "view-delete", label: "4 — Delete Note" },
];

function ViewsNav({ activeId }) {
  return (
    <nav className="views-nav" aria-label="View prototypes">
      <div className="views-nav-inner">
        <span className="view-label">Views:</span>
        {VIEW_TABS.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={`view-tab${activeId === tab.id ? " active" : ""}`}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
function SinglePostView({ note, notes }) {
  const activeNote = note ?? NOTES[0];
  const backgroundNotes = notes ?? NOTES.slice(0, 6);

  return (
    <section id="view-post" className="view-section">
      <div className="view-section-label">
        <h2>Single Post</h2>
      </div>
      <p className="view-desc">
        Clicking any note enlarges the note view over the board with the date,
        title, description, and votes visible. The note owner sees Edit and
        Delete options.
      </p>
      <div className="viewport-frame">
        <div className="viewport-scene">

          <div className="scene-bg">
            <div className="scene-bg-header" />

            <div className="scene-bg-board">
              {backgroundNotes.map((bgNote) => (
                  <div
                      key={bgNote.id}
                      className={`bg-note note-${bgNote.color}`}
                  >
                    {bgNote.title}
                  </div>
              ))}
            </div>
          </div>

          <div className="scene-overlay">
            <div className={`note-modal note-${activeNote.color}`}>
              <span className="note-modal-tag">Single post</span>
              <h2 className="note-modal-title">{activeNote.title}</h2>
              <p className="note-modal-body">{activeNote.description}</p>
              <div className="note-modal-footer">
                <VoteButtons up={activeNote.up} down={activeNote.down} />
                <span className="note-date">{formatDate(activeNote.date)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function CreateNoteView() {
  return (
    <section id="view-create" className="view-section">
      <div className="view-section-label">
        <h2>Create Note</h2>
      </div>
      <p className="view-desc">
        Clicking &quot;+ Post Note&quot; opens a blank sticky note to write on.
        The user can write a title and description then choose a color swatch
        before posting the note.
      </p>
      <div className="viewport-frame">
        <div className="viewport-scene">
          <div className="scene-bg">
            <div className="scene-bg-header" />
            <div className="scene-bg-board">
              <div className="bg-note note-pink">AI Replaced Our Writers</div>
              <div className="bg-note note-green">AI Art Won the Festival</div>
              <div className="bg-note note-orange">Useless AI Assistants</div>
              <div className="bg-note note-purple">AI Diagnosed Horse Disease</div>
              <div className="bg-note note-yellow">Same 5 Songs Forever</div>
            </div>
          </div>
          <div className="scene-overlay">
            <div
              className="create-note-modal note-yellow"
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-title"
            >
              <button className="note-modal-close" aria-label="Close">
                ✕
              </button>
              <span className="create-note-hint">New complaint</span>
              <input
                className="note-input note-input-title"
                type="text"
                id="create-title"
                placeholder="Give it a title…"
                readOnly
              />
              <div
                className="note-input note-input-body"
                style={{
                  color: "rgba(0, 0, 0, 0.35)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                What happened? Tell the board…
              </div>
              <div className="create-note-footer">
                <div className="note-swatch-row">
                  <span className="note-swatch-label">Color:</span>
                  <span className="swatch swatch-yellow selected" title="Yellow" />
                  <span className="swatch swatch-pink" title="Pink" />
                  <span className="swatch swatch-blue" title="Blue" />
                  <span className="swatch swatch-green" title="Green" />
                  <span className="swatch swatch-orange" title="Orange" />
                  <span className="swatch swatch-purple" title="Purple" />
                </div>
                <div className="create-note-actions">
                  <button type="button" className="btn-note-cancel">
                    Cancel
                  </button>
                  <button type="button" className="btn-note-save">
                    📌 Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditNoteView() {
  return (
    <section id="view-edit" className="view-section">
      <div className="view-section-label">
        <h2>Edit Note</h2>
      </div>
      <p className="view-desc">
        Clicking Edit on an owned note re-opens it as an enlarged sticky note
        with editable fields.
      </p>
      <div className="viewport-frame">
        <div className="viewport-scene">
          <div className="scene-bg">
            <div className="scene-bg-header" />
            <div className="scene-bg-board">
              <div className="bg-note bg-note-hero note-yellow">
                ChatGPT Wrote My Thesis
              </div>
              <div className="bg-note note-pink">AI Replaced Our Writers</div>
              <div className="bg-note note-blue">Resume Screener Rejected Me</div>
              <div className="bg-note note-green">AI Art Won the Festival</div>
              <div className="bg-note note-orange">Useless AI Assistants</div>
            </div>
          </div>
          <div className="scene-overlay">
            <div
              className="note-modal note-yellow"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-title"
            >
              <button className="note-modal-close" aria-label="Close">
                ✕
              </button>
              <span className="note-modal-tag">Editing your note</span>
              <input
                className="note-input note-input-title"
                type="text"
                id="edit-title"
                defaultValue="ChatGPT Wrote My Thesis"
                readOnly
              />
              <div className="note-input note-input-body">
                ChatGPT wrote my entire thesis and now I don&apos;t know what I
                actually believe anymore. I defended ideas I barely understand.
              </div>
              <div className="note-modal-edit-footer">
                <div className="note-swatch-row">
                  <span className="note-swatch-label">Color:</span>
                  <span className="swatch swatch-yellow selected" title="Yellow" />
                  <span className="swatch swatch-pink" title="Pink" />
                  <span className="swatch swatch-blue" title="Blue" />
                  <span className="swatch swatch-green" title="Green" />
                  <span className="swatch swatch-orange" title="Orange" />
                  <span className="swatch swatch-purple" title="Purple" />
                </div>
                <div className="note-edit-actions">
                  <button type="button" className="btn-note-cancel">
                    Cancel
                  </button>
                  <button type="button" className="btn-note-save">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeleteNoteView() {
  return (
    <section id="view-delete" className="view-section">
      <div className="view-section-label">
        <h2>Delete Note</h2>
      </div>
      <p className="view-desc">
        Clicking Delete on an owned note opens the same enlarged sticky note
        asking for confirmation.
      </p>
      <div className="viewport-frame">
        <div className="viewport-scene">
          <div className="scene-bg">
            <div className="scene-bg-header" />
            <div className="scene-bg-board">
              <div className="bg-note bg-note-hero note-yellow">
                ChatGPT Wrote My Thesis
              </div>
              <div className="bg-note note-pink">AI Replaced Our Writers</div>
              <div className="bg-note note-blue">Resume Screener Rejected Me</div>
              <div className="bg-note note-green">AI Art Won the Festival</div>
              <div className="bg-note note-orange">Useless AI Assistants</div>
            </div>
          </div>
          <div className="scene-overlay">
            <div
              className="note-modal note-yellow"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
            >
              <button className="note-modal-close" aria-label="Close">
                ✕
              </button>
              <div className="note-delete-body">
                <span className="delete-icon">🗑️</span>
                <h2 className="delete-question" id="delete-title">
                  Remove &quot;ChatGPT Wrote My Thesis&quot;?
                </h2>
                <p className="delete-subtext">This cannot be undone.</p>
                <div className="delete-note-actions">
                  <button type="button" className="btn-keep">
                    Keep it
                  </button>
                  <button type="button" className="btn-confirm-delete">
                    Yes, delete it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ViewsPage() {
  const [activeId, setActiveId] = useState("view-post");
  const mainRef = useRef(null);

  useEffect(() => {
    const sections = mainRef.current?.querySelectorAll(".view-section");
    if (!sections?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <ViewsNav activeId={activeId} />
      <main ref={mainRef} style={{ flex: 1 }}>
        <SinglePostView />
        <div className="section-sep">
          <span>View 2</span>
        </div>
        <CreateNoteView />
        <div className="section-sep">
          <span>View 3</span>
        </div>
        <EditNoteView />
        <div className="section-sep">
          <span>View 4</span>
        </div>
        <DeleteNoteView />
      </main>
      <Footer />
    </>
  );
}
