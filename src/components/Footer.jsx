import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bm-footer">
      <div className="bm-footer-inner">
        <div>
          <div className="bm-footer-logo">J EVENTS</div>
          <div className="bm-footer-copy">© 2025 · All rights reserved</div>
        </div>
        <div className="bm-footer-links">
          <Link to="/#services">Services</Link>
          <Link to="/#work">Work</Link>
          <Link to="/#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
