import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bm-nav">
      <Link to="/" className="bm-logo">J EVENTS</Link>
      <Link to="/book" className="bm-cta">Book now</Link>
    </nav>
  );
}
