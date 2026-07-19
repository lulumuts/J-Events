const timelineItems = [
  {
    period: '2015 - 2017',
    title: 'The Spark',
    body: (
      <>
        While working at a publisher, <em>Research</em>, I fell in love with organising events
        while putting together our annual User Groups Meetings.
      </>
    ),
  },
  {
    period: '2017 - 2021',
    title: 'Building Momentum',
    body: (
      <>
        I moved onto an events agency, Maddox Events, to create the Women in Construction World
        Series, which had editions in London, Amsterdam and San Francisco. I also supported the
        largest tech events in Europe, the Women in Technology World Series which covered London,
        Amsterdam, Glasgow, Boston, San Francisco.
      </>
    ),
  },
  {
    period: '2021 - 2023',
    title: 'Building It My Way',
    body: (
      <>
        I took the plunge and dived into the freelancing world. This started with podcast
        production, general support for business meetings and within a few months working on a
        Virtual Summit with over 1000 attendees to kick off my events freelancer career… and
        I&apos;ve never looked back.
      </>
    ),
  },
];

export default function AboutTimeline() {
  return (
    <ol className="bm-about-timeline" aria-label="Career timeline">
      {timelineItems.map((item) => (
        <li key={item.period} className="bm-about-timeline__item">
          <p className="bm-about-timeline__period">{item.period}</p>
          <h2 className="bm-about-timeline__title">{item.title}</h2>
          <p className="bm-about-timeline__body">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
