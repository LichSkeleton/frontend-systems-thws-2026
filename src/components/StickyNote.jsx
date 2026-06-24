import { formatDate } from "../utils/formatDate";
import VoteButtons from "./VoteButtons";

export default function StickyNote({ note, tiltDeg, onClick, onVote }) {
  return (
    <article
      onClick={onClick}
      className={`sticky-note note-${note.color}`}
      style={{ transform: `rotate(${tiltDeg}deg)` }}
    >
      <h3 className="note-title">
        <span className="note-title-link">{note.title}</span>
      </h3>
      <p className="note-preview">{note.description}</p>
      <div className="note-footer">
        <VoteButtons up={note.up} down={note.down} onVote={onVote} />
        <span className="note-date">{formatDate(note.date)}</span>
      </div>
    </article>
  );
}
