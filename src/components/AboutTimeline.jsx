import { useSiteContent } from '../hooks/useSiteContent';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../lib/sanity/portableTextComponents.js';

function TimelinePeriod({ item }) {
  if (item.periodPlain) {
    return <p className="bm-about-timeline__period">{item.periodPlain}</p>;
  }

  return (
    <p className="bm-about-timeline__period">
      {item.periodBeforeHighlight}
      {item.periodHighlight ? (
        <span className="bm-about-timeline__period-as-written">{item.periodHighlight}</span>
      ) : null}
    </p>
  );
}

function TimelineCopy({ item }) {
  return (
    <>
      <TimelinePeriod item={item} />
      <h2 className="bm-about-timeline__title">{item.title}</h2>
      <p className="bm-about-timeline__body">
        <PortableText value={item.body} components={portableTextComponents} />
      </p>
    </>
  );
}

export default function AboutTimeline() {
  const { content } = useSiteContent();
  const byKey = Object.fromEntries(
    content.aboutPage.timeline.map((item) => [item.key, item]),
  );
  const spark = byKey.spark ?? content.aboutPage.timeline[0];
  const momentum = byKey.momentum ?? content.aboutPage.timeline[1];
  const myWay = byKey.myWay ?? content.aboutPage.timeline[2];

  return (
    <div className="bm-about-timeline" aria-label="Career timeline">
      <div className="bm-about-timeline__above bm-about-timeline__above--left">
        <TimelineCopy item={spark} />
      </div>

      <div className="bm-about-timeline__above bm-about-timeline__above--right">
        <TimelineCopy item={myWay} />
      </div>

      <div className="bm-about-timeline__rail" aria-hidden="true">
        <span className="bm-about-timeline__dot" />
        <span className="bm-about-timeline__dot" />
        <span className="bm-about-timeline__dot" />
      </div>

      <div className="bm-about-timeline__below bm-about-timeline__below--center">
        <TimelineCopy item={momentum} />
      </div>
    </div>
  );
}
