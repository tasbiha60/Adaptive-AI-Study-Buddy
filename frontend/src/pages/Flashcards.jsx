
import { useState } from 'react'
import './Flashcards.css'

import Flashcard from '../components/flashcards/Flashcards'
import FlashcardStats from '../components/flashcards/FlashcardStats'
import FlashcardProgress from '../components/flashcards/FlashcardProgress'
import FlashcardEmpty from '../components/flashcards/FlashcardEmpty'

function Flashcards() {
  const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [knownCards, setKnownCards] = useState([])
  const [practiceCards, setPracticeCards] = useState([])

  const currentCard = cards[currentIndex]

  const handleRating = (status) => {
    const cardId = currentCard.id

    if (status === 'known') {
      setKnownCards((prev) => [...new Set([...prev, cardId])])
      setPracticeCards((prev) => prev.filter((id) => id !== cardId))
    } else {
      setPracticeCards((prev) => [...new Set([...prev, cardId])])
      setKnownCards((prev) => prev.filter((id) => id !== cardId))
    }

    handleNext()
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, cards.length - 1)
    )
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleShuffle = () => {
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
  }

  const progress = cards.length
    ? ((currentIndex + 1) / cards.length) * 100
    : 0

  return (
    <div className="flashcards-page">
      <div className="flashcards-header">
        <p className="page-label">YOUR STUDY SPACE</p>
        <h1>Smart Flashcards</h1>
        <p>Learn, recall and strengthen your knowledge.</p>
      </div>

      <FlashcardStats
        total={cards.length}
        known={knownCards.length}
        practice={practiceCards.length}
      />

      {cards.length === 0 ? (
        <FlashcardEmpty />
      ) : (
        <>
          <FlashcardProgress
            current={currentIndex + 1}
            total={cards.length}
            progress={progress}
          />

          <Flashcard
            key={currentCard.id}
            question={currentCard.question}
            answer={currentCard.answer}
          />

          <div className="flashcard-actions">
            <button
              className="action-button practice-button"
              onClick={() => handleRating('practice')}
            >
              Need Practice
            </button>

            <button
              className="action-button known-button"
              onClick={() => handleRating('known')}
            >
              I Know This
            </button>
          </div>

          <div className="flashcard-navigation">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>

            <button onClick={handleShuffle}>Shuffle</button>

            <button
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Flashcards


