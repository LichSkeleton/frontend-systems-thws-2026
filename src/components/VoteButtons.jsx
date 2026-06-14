export default function VoteButtons({ up, down }) {
  return (
    <div className="note-votes">
      <span className="vote-btn vote-up">
        👍 <span className="vote-count">{up}</span>
      </span>
      <span className="vote-btn vote-down">
        👎 <span className="vote-count">{down}</span>
      </span>
    </div>
  );
}
