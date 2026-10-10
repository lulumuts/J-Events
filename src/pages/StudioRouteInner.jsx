import { Studio } from 'sanity';
import config from '../../sanity.config.js';
import './Studio.css';

export default function StudioRouteInner() {
  return (
    <div className="bm-studio-shell">
      <Studio config={config} />
    </div>
  );
}
