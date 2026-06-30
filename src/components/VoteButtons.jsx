import { useNotes } from "../context/NotesContext";

export default function VoteButtons({ noteId, up, down }) {
  const { getUserVote, handleVote } = useNotes();
  const voted = noteId != null ? getUserVote(noteId) : null;
  const net = up - down;

  const handleClick = (direction) => (event) => {
    event.stopPropagation();
    if (noteId != null) handleVote(noteId, direction);
  };

  return (
    <div className="note-votes">
      <button
        className={`vote-btn vote-up${voted === "up" ? " voted" : ""}`}
        onClick={handleClick("up")}
      >
        👍
      </button>
      <button
        className={`vote-btn vote-down${voted === "down" ? " voted" : ""}`}
        onClick={handleClick("down")}
      >
        👎
      </button>
      <span className="vote-net">❤️ {net > 0 ? `+${net}` : net}</span>
    </div>
  );
}
