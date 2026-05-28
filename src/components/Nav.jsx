import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bm-nav">
      <Link to="/" className="bm-logo">J EVENTS</Link>
      <ul className="bm-navlinks">
        <li><a href="/#services">Services</a></li>
        <li><a href="/#work">Work</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>
      <Link to="/book" className="bm-cta">Book now</Link>
    </nav>
  );
}
