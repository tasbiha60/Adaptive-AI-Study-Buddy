import { useState } from 'react'
import './PDFUpload.css'

function PDFUpload() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [quiz, setQuiz] = useState(null)
  const [quizLoading, setQuizLoading] = useState(false)
  const [quizError, setQuizError] = useState('')

  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleFileChange(event) {
    setFile(event.target.files[0])
    setResult(null)
    setQuiz(null)
    setError('')
    setQuizError('')
    setSelectedAnswers({})
    setSubmitted(false)
  }

  async function handleUpload() {
    if (!file) {
      setError('Please select a PDF file first.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    setError('')
    setResult(null)
    setQuiz(null)
    setSelectedAnswers({})
    setSubmitted(false)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/upload-pdf',
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'PDF upload failed.')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateQuiz() {
    if (!result || !result.chunks?.length) {
      setQuizError('Please upload a PDF first.')
      return
    }

    setQuizLoading(true)
    setQuizError('')
    setQuiz(null)
    setSelectedAnswers({})
    setSubmitted(false)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/generate-quiz',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chunks: result.chunks,
            number_of_questions: 5,
            difficulty: 'easy'
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Quiz generation failed.')
      }

      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid quiz response from server.')
      }

      setQuiz(data)
    } catch (err) {
      setQuizError(err.message)
    } finally {
      setQuizLoading(false)
    }
  }

  function handleAnswerSelect(questionIndex, optionIndex) {
    if (submitted) return

    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  function getCorrectAnswerIndex(question) {
    const answer = String(question.correct_answer || '').trim()

    // First check whether the answer is the actual option text.
    const textIndex = question.options.findIndex(
      option =>
        String(option).trim().toLowerCase() === answer.toLowerCase()
    )

    if (textIndex !== -1) return textIndex

    // Also support answers such as A, B, Option A, or A.
    const letterMatch = answer.match(
      /^(?:option\s*)?([A-D])(?:[.)\s:-]|$)/i
    )

    if (letterMatch) {
      return letterMatch[1].toUpperCase().charCodeAt(0) - 65
    }

    return -1
  }

  function handleSubmitQuiz() {
    if (!quiz) return

    if (Object.keys(selectedAnswers).length !== quiz.questions.length) {
      setQuizError('Please answer all questions before submitting.')
      return
    }

    setQuizError('')
    setSubmitted(true)
  }

  const score = quiz
    ? quiz.questions.reduce((total, question, index) => {
        return total +
          (selectedAnswers[index] === getCorrectAnswerIndex(question) ? 1 : 0)
      }, 0)
    : 0

  return (
    <div className="pdf-upload-page">
      <div className="upload-container">
        <h1>Upload Your Study Material</h1>
        <p>Select a PDF file to start your learning journey.</p>

        <div className="upload-box">
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />

          {file && <p>Selected: {file.name}</p>}

          <button onClick={handleUpload} disabled={loading}>
            {loading ? 'Processing PDF...' : 'Upload PDF'}
          </button>
        </div>

        {error && (
          <p className="error-message">{error}</p>
        )}

        {result && (
          <div className="upload-result">
            <h2>{result.message}</h2>

            <p>Filename: {result.filename}</p>
            <p>Total Pages: {result.total_pages}</p>
            <p>Total Chunks: {result.total_chunks}</p>

            <h3>Extracted Text Chunks</h3>

            {result.chunks?.map((chunk, index) => (
              <div className="upload-chunk" key={index}>
                <h4>Chunk {index + 1}</h4>
                <pre>{chunk}</pre>
              </div>
            ))}

            <button
              onClick={handleGenerateQuiz}
              disabled={quizLoading}
            >
              {quizLoading ? 'Generating Quiz...' : 'Generate AI Quiz'}
            </button>
          </div>
        )}

        {quizError && (
          <p className="error-message">{quizError}</p>
        )}

        {quiz && (
          <div className="quiz-result">
            <h2>AI Generated Quiz</h2>
            <p>{quiz.message}</p>
            <p>Total Questions: {quiz.total_questions}</p>
            <p>Difficulty: {quiz.difficulty}</p>

            {!submitted && (
              <p>Select one answer for each question, then submit your quiz.</p>
            )}

            {submitted && (
              <div className="quiz-score">
                <h2>Quiz Results</h2>
                <h3>
                  Your Score: {score} / {quiz.questions.length}
                </h3>
                <p>
                  Percentage: {Math.round(
                    (score / quiz.questions.length) * 100
                  )}%
                </p>
              </div>
            )}

            {quiz.questions.map((question, index) => {
              const correctIndex = getCorrectAnswerIndex(question)
              const isCorrect =
                selectedAnswers[index] === correctIndex

              return (
                <div className="quiz-question" key={index}>
                  <h3>
                    Question {index + 1}: {question.question}
                  </h3>

                  <div className="quiz-options">
                    {question.options.map((option, optionIndex) => (
                      <label
                        className={`quiz-option ${
                          selectedAnswers[index] === optionIndex
                            ? 'selected'
                            : ''
                        } ${
                          submitted && optionIndex === correctIndex
                            ? 'correct'
                            : ''
                        } ${
                          submitted &&
                          selectedAnswers[index] === optionIndex &&
                          !isCorrect
                            ? 'incorrect'
                            : ''
                        }`}
                        key={optionIndex}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={selectedAnswers[index] === optionIndex}
                          onChange={() =>
                            handleAnswerSelect(index, optionIndex)
                          }
                          disabled={submitted}
                        />

                        <span>
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </span>
                      </label>
                    ))}
                  </div>

                  {submitted && (
                    <div className="answer-feedback">
                      <p>
                        <strong>
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </strong>
                      </p>

                      <p>
                        <strong>Correct Answer:</strong>{' '}
                        {correctIndex >= 0
                          ? question.options[correctIndex]
                          : question.correct_answer}
                      </p>

                      <p>
                        <strong>Explanation:</strong>{' '}
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}

            {!submitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleGenerateQuiz}
                disabled={quizLoading}
              >
                {quizLoading ? 'Generating...' : 'Generate Another Quiz'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFUpload


