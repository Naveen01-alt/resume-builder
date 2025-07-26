import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">ResumePro</div>

        <nav className="navbar-links">
          <a href="#features" className="navbar-link">Features</a>
          <a href="#templates" className="navbar-link">Templates</a>
          <a href="#how-it-works" className="navbar-link">How it Works</a>
          <a href="#contact" className="navbar-link">Contact</a>
        </nav>

        

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#templates" onClick={() => setMenuOpen(false)}>Templates</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it Works</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#" className="navbar-btn" onClick={() => setMenuOpen(false)}>Start</a>
        </div>
      )}
    </header>
  );
}
