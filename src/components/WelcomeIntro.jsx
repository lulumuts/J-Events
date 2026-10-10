import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../lib/sanity/portableTextComponents.js';
import Reveal from './Reveal';

export default function WelcomeIntro() {
  const { content } = useSiteContent();
  const { introLead, introBody, introLinkLabel } = content.homePage;

  return (
    <div className="bm-intro-section">
      <div className="bm-intro-inner">
        <Reveal>
          <div className="bm-intro">
            <p className="bm-intro-lead">
              {introLead}
            </p>
            <p className="bm-intro-body">
              <PortableText value={introBody} components={portableTextComponents} />
            </p>
            <Link className="bm-learn-more" to="/about">{introLinkLabel}</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
