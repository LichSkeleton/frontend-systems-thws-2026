import { formatDate } from "../utils/formatDate";
import VoteButtons from "./VoteButtons";

export default function RecentCard({ note }) {
  return (
    <div className={`recent-card note-${note.color}`}>
      <h3 className="card-title">
        <span className="note-title-link">{note.title}</span>
      </h3>
      <div className="card-footer">
        <VoteButtons up={note.up} down={note.down} />
        <span className="note-date">{formatDate(note.date)}</span>
      </div>
    </div>
  );
}
