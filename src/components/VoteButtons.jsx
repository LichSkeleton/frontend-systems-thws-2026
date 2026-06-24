import {useState} from "react";

export default function VoteButtons({ up, down }) {
    const [upVotes, setUpVotes] = useState(up);
    const [downVotes, setDownVotes] = useState(down);

    const voteUp = () => {
        setUpVotes(upVotes + 1);
    };

    const voteDown = () => {
        setDownVotes(downVotes + 1);
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
