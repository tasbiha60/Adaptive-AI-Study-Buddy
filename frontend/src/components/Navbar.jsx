import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">

      <a href="/" className="navbar-brand">
        <span className="brand-icon">A</span>
        <span>
          Adaptive<span className="brand-highlight">AI</span>
        </span>
      </a>

      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
      </div>

      <div className="navbar-actions">
        <a href="/student-login" className="signin-link">
          Sign in
        </a>

        <a href="/student-login" className="get-started-btn">
          Get started
        </a>
      </div>

    </nav>
  )
}

export default Navbar
