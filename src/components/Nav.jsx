import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';

export default function Nav() {
  const { content } = useSiteContent();
  const { navLogoText, navCtaLabel } = content.siteSettings;

  return (
    <nav className="bm-nav">
      <Link to="/" className="bm-logo">{navLogoText}</Link>
      <Link to="/book" className="bm-cta">{navCtaLabel}</Link>
    </nav>
  );
}
