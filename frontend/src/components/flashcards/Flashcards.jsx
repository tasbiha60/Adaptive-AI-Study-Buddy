
import { useState } from 'react'
import './Flashcard.css'

function Flashcard({ question, answer }) {

  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <button
      className="flashcard"
      onClick={handleFlip}
      type="button"
    >
      <span className="flashcard-label">
        {isFlipped ? 'ANSWER' : 'QUESTION'}
      </span>

      <h2>
        {isFlipped ? answer : question}
      </h2>

      <span className="flip-hint">
        Click to {isFlipped ? 'see question' : 'reveal answer'}
      </span>
    </button>
  )
}

export default Flashcard
