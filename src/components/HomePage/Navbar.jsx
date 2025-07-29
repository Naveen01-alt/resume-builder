import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    setMenuOpen(false); // close mobile menu
    navigate(path);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNav('/')}>
          ResumePro
        </div>

        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => handleNav('/featuresection')}>Features</button>
          <button className="navbar-link" onClick={() => handleNav('/templateselection')}>Templates</button>
          <button className="navbar-link" onClick={() => handleNav('/howitworkssection')}>How it Works</button>
          
        </nav>

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {!menuOpen ? '☰' : '✖'}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
        <button onClick={() => handleNav('/featuresection')}>Features</button>
        <button onClick={() => handleNav('/templateselection')}>Templates</button>
        <button onClick={() => handleNav('/howitworkssection')}>How it Works</button>
        
        
      </div>
    </header>
  );
}
