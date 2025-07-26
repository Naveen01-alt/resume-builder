







import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">© {new Date().getFullYear()} ResumePro. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
