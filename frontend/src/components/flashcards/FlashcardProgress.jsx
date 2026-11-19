
function FlashcardProgress({ current, total, progress }) {
  return (
    <div className="flashcard-progress">
      <div className="progress-heading">
        <span>Your Progress</span>
        <span>{current} / {total}</span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default FlashcardProgress
