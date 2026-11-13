

import './Features.css'

function Features() {
  return (
    <section className="features-section" id="features">

      <div className="features-heading">
        <span className="section-tag">WHAT YOU CAN DO</span>

        <h2>
          Everything You Need to
          <span> Learn Smarter</span>
        </h2>

        <p>
          Discover a more personalized way to learn, practice,
          and improve with your AI study companion.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Smart Study Materials</h3>
          <p>
            Upload your lecture PDFs or explore any topic
            to create a personalized learning experience.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>AI Concept Explanation</h3>
          <p>
            Understand difficult topics through simple,
            personalized, and student-friendly explanations.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🗂️</div>
          <h3>Smart Flashcards</h3>
          <p>
            Generate AI-powered flashcards or create your
            own to remember important concepts.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">✍️</div>
          <h3>Interactive Quizzes</h3>
          <p>
            Test your understanding with AI-generated
            questions and instant performance feedback.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Adaptive Learning</h3>
          <p>
            Get personalized learning recommendations
            and difficulty levels based on your progress.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Learning Analytics</h3>
          <p>
            Track your progress, discover weak areas,
            and see how your learning improves over time.
          </p>
        </div>

      </div>

    </section>
  )
}

export default Features

