
import './Hero.css'

function Hero() {
  return (
    <section className="hero-section" id="home">

      <div className="hero-content">
        <span className="hero-tag">
          YOUR PERSONAL AI STUDY COMPANION
        </span>

        <h1>
          Learn Smarter.
          <span> Grow Further.</span>
        </h1>

        <p className="hero-description">
          Make learning more personal with AI-powered explanations,
          interactive practice, and a study experience that adapts
          to your progress.
        </p>

        <div className="hero-buttons">
          <a href="#features" className="hero-primary-btn">
            Start Learning
            <span>→</span>
          </a>

          <a href="#how-it-works" className="hero-secondary-btn">
            Explore How It Works
          </a>
        </div>

        <p className="hero-note">
          A smarter way to understand, practice, and improve.
        </p>
      </div>

      <div className="hero-preview">
        <div className="preview-header">
          <div>
            <span className="preview-label">YOUR LEARNING SPACE</span>
            <h3>Learning Overview</h3>
          </div>

          <span className="preview-status">Sample Preview</span>
        </div>

        <div className="preview-welcome">
          <div>
            <span className="preview-small-text">YOUR STUDY JOURNEY</span>
            <h2>Keep moving forward!</h2>
            <p>Every small step makes a difference.</p>
          </div>

          <div className="preview-icon">✦</div>
        </div>

        <div className="preview-progress">
          <div className="progress-heading">
            <span>Python Fundamentals</span>
            <strong>75%</strong>
          </div>

          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>

          <span className="progress-caption">
            Sample learning progress
          </span>
        </div>

        <div className="preview-bottom">
          <div className="preview-mini-card">
            <span className="mini-card-icon">✎</span>
            <span className="mini-card-label">Practice</span>
            <strong>Interactive quizzes</strong>
          </div>

          <div className="preview-mini-card">
            <span className="mini-card-icon">✧</span>
            <span className="mini-card-label">Personalize</span>
            <strong>Adaptive learning</strong>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
