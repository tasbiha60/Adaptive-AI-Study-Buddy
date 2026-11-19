
function FlashcardStats({ total, known, practice }) {
  return (
    <div className="flashcards-stats">
      <div className="stat-item">
        <span>Total Cards</span>
        <h3>{total}</h3>
      </div>

      <div className="stat-item">
        <span>Known</span>
        <h3>{known}</h3>
      </div>

      <div className="stat-item">
        <span>Need Practice</span>
        <h3>{practice}</h3>
      </div>
    </div>
  )
}

export default FlashcardStats
