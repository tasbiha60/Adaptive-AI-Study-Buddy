
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

  function handleFileChange(event) {
    setFile(event.target.files[0])
    setResult(null)
    setQuiz(null)
    setError('')
    setQuizError('')
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

      setQuiz(data)
    } catch (err) {
      setQuizError(err.message)
    } finally {
      setQuizLoading(false)
    }
  }

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

            {result.chunks && result.chunks.map((chunk, index) => (
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

            {quiz.questions.map((question, index) => (
              <div className="quiz-question" key={index}>
                <h3>
                  Question {index + 1}: {question.question}
                </h3>

                {question.options.map((option, optionIndex) => (
                  <p key={optionIndex}>
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </p>
                ))}

                <p>
                  <strong>Correct Answer:</strong> {question.correct_answer}
                </p>

                <p>
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFUpload

