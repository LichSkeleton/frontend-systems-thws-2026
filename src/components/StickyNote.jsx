import { formatDate } from "../utils/formatDate";
import VoteButtons from "./VoteButtons";

export default function StickyNote({ note, rank, tiltDeg }) {
  return (
    <article
      className={`sticky-note note-${note.color}`}
      style={{ transform: `rotate(${tiltDeg}deg)` }}
    >
      <span className="note-rank">#{rank}</span>
      <h3 className="note-title">
        <span className="note-title-link">{note.title}</span>
      </h3>
      <div className="note-footer">
        <VoteButtons up={note.up} down={note.down} />
        <span className="note-date">{formatDate(note.date)}</span>
      </div>
    </article>
  );
}
