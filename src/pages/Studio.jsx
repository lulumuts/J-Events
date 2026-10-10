import { lazy, Suspense, useEffect } from 'react';
import { isSanityConfigured } from '../lib/sanity/env';
import './Studio.css';

const StudioRouteInner = lazy(() => import('./StudioRouteInner.jsx'));

export default function StudioPage() {
  useEffect(() => {
    document.documentElement.classList.add('bm-studio-route');
    return () => document.documentElement.classList.remove('bm-studio-route');
  }, []);

  if (!isSanityConfigured) {
    return (
      <div className="bm-studio-setup">
        <h1>Sanity Studio</h1>
        <p>
          Add <code>VITE_SANITY_PROJECT_ID</code> and <code>VITE_SANITY_DATASET</code> to your
          environment, then reload this page.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="bm-studio-shell" aria-hidden="true" />}>
      <StudioRouteInner />
    </Suspense>
  );
}
