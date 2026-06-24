import { useState } from "react";

export default function VoteButtons({ up, down, onVote }) {
  const [localUp, setLocalUp] = useState(up);
  const [localDown, setLocalDown] = useState(down);
  const [voted, setVoted] = useState(null);

  const controlled = onVote != null;
  const upVotes = controlled ? up : localUp;
  const downVotes = controlled ? down : localDown;
  const net = upVotes - downVotes;

  const handleClick = (direction) => (event) => {
    event.stopPropagation();
    const prev = voted;
    const next = prev === direction ? null : direction;
    setVoted(next);

    if (controlled) {
      onVote(next, prev);
    } else {
      setLocalUp((c) => c + (next === "up" ? 1 : 0) - (prev === "up" ? 1 : 0));
      setLocalDown((c) => c + (next === "down" ? 1 : 0) - (prev === "down" ? 1 : 0));
    }
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
