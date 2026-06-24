import { useState } from "react";

export default function VoteButtons({ up, down, onVoteUp, onVoteDown }) {
  const [localUp, setLocalUp] = useState(up);
  const [localDown, setLocalDown] = useState(down);

  const controlled = onVoteUp != null || onVoteDown != null;
  const upVotes = controlled ? up : localUp;
  const downVotes = controlled ? down : localDown;

  const voteUp = (event) => {
    event.stopPropagation();
    if (onVoteUp) {
      onVoteUp();
    } else {
      setLocalUp((count) => count + 1);
    }
  };

  const voteDown = (event) => {
    event.stopPropagation();
    if (onVoteDown) {
      onVoteDown();
    } else {
      setLocalDown((count) => count + 1);
    }
  };

  return (
    <div className="note-votes">
      <button className="vote-btn vote-up" onClick={voteUp}>
        👍 <span className="vote-count">{upVotes}</span>
      </button>
      <button className="vote-btn vote-down" onClick={voteDown}>
        👎 <span className="vote-count">{downVotes}</span>
      </button>
    </div>
  );
}
