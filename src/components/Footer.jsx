import { useSiteContent } from '../hooks/useSiteContent';

export default function Footer() {
  const { content } = useSiteContent();
  const { footerLogoText, footerCopyright } = content.siteSettings;

  return (
    <footer className="bm-footer">
      <div className="bm-footer-inner">
        <div>
          <div className="bm-footer-logo">{footerLogoText}</div>
          <div className="bm-footer-copy">{footerCopyright}</div>
        </div>
      </div>
    </footer>
  );
}
