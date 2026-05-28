import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bm-nav">
      <Link to="/" className="bm-logo">J EVENTS</Link>
      <ul className="bm-navlinks">
        <li><Link to="/#services">Services</Link></li>
        <li><Link to="/#work">Work</Link></li>
        <li><Link to="/#contact">Contact</Link></li>
      </ul>
      <Link to="/book" className="bm-cta">Book now</Link>
    </nav>
  );
}
