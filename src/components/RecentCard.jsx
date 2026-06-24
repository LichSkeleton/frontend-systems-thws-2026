import { formatDate } from "../utils/formatDate";
import VoteButtons from "./VoteButtons";

export default function RecentCard({ note, onClick, onVoteUp, onVoteDown }) {
  return (
    <article className={`recent-card note-${note.color}`} onClick={onClick}>
      <h3 className="card-title">
        <span className="note-title-link">{note.title}</span>
      </h3>
      <div className="card-footer">
        <VoteButtons
          up={note.up}
          down={note.down}
          onVoteUp={onVoteUp}
          onVoteDown={onVoteDown}
        />
        <span className="note-date">{formatDate(note.date)}</span>
      </div>
    </article>
  );
}
