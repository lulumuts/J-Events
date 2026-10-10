import top5Logo from '../../assets/logos/top5.png';
import roundhouseLogo from '../../assets/logos/roundhouse-logo.png';
import constructionCfoLogo from '../../assets/logos/construction-cfo-summit-logo.png';
import nowYouKnowLogo from '../../assets/logos/now-you-know-logo.png';
import powerWithinYouLogo from '../../assets/logos/power-within-you-logo.png';
import mainStreetEventsLogo from '../../assets/logos/main-street-events-logo.png';
import collectionsLogo from '../../assets/logos/collections-logo.png';
import e3gLogo from '../../assets/logos/e3g-logo.png';
import discomLogo from '../../assets/logos/discom-logo.png';
import climateFoundersWeekLogo from '../../assets/logos/climate-founders-week-logo.png';
import braveLeadershipSummitLogo from '../../assets/logos/brave-leadership-summit-logo.png';
import { allFeaturedSlugs, categories, projects } from '../../data/projects';
import { assetUrl } from '../../utils/assetUrl';

const introBodyFallback = [
  {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        text: 'In the realm of event management, I excel in curating impactful gatherings that inspire, educate, and connect. Whether it\'s a corporate summit, industry conference or fashion pop up, I\'m able to take your vision to execution with creative project plans covering content, venue & logistics while focusing on ',
      },
      { _type: 'span', text: 'the', marks: ['emph'] },
      {
        _type: 'span',
        text: ' experience of your guest.',
      },
    ],
  },
];

const timelineSparkBody = [
  {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      { _type: 'span', text: 'While working at a publisher, ' },
      { _type: 'span', text: 'Research', marks: ['em'] },
      {
        _type: 'span',
        text: ', I fell in love with organising events while putting together our annual User Groups Meetings.',
      },
    ],
  },
];

const timelineMomentumBody = [
  {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        text: 'I moved onto an events agency, Maddox Events, to create the Women in Construction World Series, which had editions in London, Amsterdam and San Francisco. I also supported the largest tech events in Europe, the Women in Technology World Series which covered London, Amsterdam, Glasgow, Boston, San Francisco.',
      },
    ],
  },
];

const timelineMyWayBody = [
  {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        text: 'I took the plunge and dived into the freelancing world. This started with podcast production, general support for business meetings and within a few months working on a Virtual Summit with over 1000 attendees to kick off my events freelancer career… and I\'ve never looked back.',
      },
    ],
  },
];

export const fallbackClientLogos = [
  { src: top5Logo, alt: "Julie's Top 5 Show" },
  { src: roundhouseLogo, alt: 'Roundhouse' },
  { src: constructionCfoLogo, alt: 'Construction CFO Summit' },
  { src: nowYouKnowLogo, alt: 'Now You Know' },
  { src: powerWithinYouLogo, alt: 'The Power Within You with Mamta Gera' },
  { src: mainStreetEventsLogo, alt: 'Main Street Events Limited' },
  { src: collectionsLogo, alt: 'Collections' },
  { src: e3gLogo, alt: 'E3G' },
  { src: discomLogo, alt: 'DisCom' },
  { src: climateFoundersWeekLogo, alt: 'Climate Founders Week' },
  { src: braveLeadershipSummitLogo, alt: 'BRAVE Leadership Summit' },
];

export function buildFallbackContent() {
  return {
    siteSettings: {
      siteTitle: 'J Events & Management',
      metaDescription:
        'J Ideas & Management — freelance events and project management for unforgettable live and virtual experiences.',
      navLogoText: 'J EVENTS',
      navCtaLabel: 'Book now',
      footerLogoText: 'J EVENTS',
      footerCopyright: '© 2025 · All rights reserved',
      contactEmail: 'hello@jevents.co.ke',
      contactPhoneDisplay: '+254 700 000 000',
      contactPhoneTel: '+254700000000',
      workCategories: categories,
    },
    homePage: {
      heroHeadline1: 'J Events',
      heroHeadline2: '& Management',
      heroPills: ['Event planner', 'Project manager', 'Content producer'],
      heroCtaLabel: 'Book a consultation',
      heroVideoMp4Url: assetUrl('hero/hero.mp4'),
      heroVideoWebmUrl: assetUrl('hero/hero.webm'),
      introLead:
        'Welcome to J Ideas & Management, where I specialise in orchestrating unforgettable experiences and seamlessly executing projects through a unique skillset providing a holistic, 360 view on events & projects.',
      introBody: introBodyFallback,
      introLinkLabel: 'About Jordan',
      statsCitiesHeading: 'Global events across',
      statsCities: ['London', 'Amsterdam', 'Paris', 'San Francisco', 'New York'],
      clientLogosLabel: 'Worked With',
      homeQuotes: [
        {
          text: 'Her gift of distilling & summarising information into useful action points is unmatched',
          author: 'Julie Adenuga',
        },
        {
          text: 'Jordan brings a clarity to event production that is a complete lifeline for me.',
          author: 'Elizabeth Corse, Founder, DisCom',
        },
        {
          text: 'She helped me turn around a 14 hour shoot, with a video, wardrobe and make up crew plus 12 talent bookings in less than three weeks.',
          author: 'Julie Adenuga',
        },
      ],
      servicesTitle: 'Services',
      servicesIntroLead:
        'People are the real formula for success, and that\'s where I come in.',
      servicesIntroRest:
        'With experience spanning event planning, content creation, and project management, I help turn your ideas into events that resonate, while keeping a genuine pulse on your community.',
      servicesCtaLabel: 'Book a consultation',
      services: [
        {
          num: '01',
          name: 'Event Management',
          intro: 'Curating, planning & executing your event idea with:',
          items: ['Strategic & actionable planning', 'Logistical mastery', 'Team management'],
        },
        {
          num: '02',
          name: 'Project Management',
          intro: 'Guiding your projects with your commitment & creativity and:',
          items: ['Creative project planning', 'Team support', 'Confident, clear communication'],
        },
        {
          num: '03',
          name: 'Speaker Management',
          intro: 'Confidently guiding & preparing your speakers with:',
          items: [
            'Clear, consistent communication',
            'Practical speaker briefings',
            'A seamless on site experience',
          ],
        },
        {
          num: '04',
          name: 'Event Consultancy',
          intro: "Planting the seed of your vision with a clear outline of what's possible with:",
          items: ['Insightful research', 'Creative action plans', 'The Journey to reality'],
        },
      ],
      workTitle: 'Work',
      featuredProjectSlugs: allFeaturedSlugs,
      contactTitle: 'Contact',
      contactSubcopy:
        'Reach out directly, or share your event details and I\'ll be in touch within 24 hours.',
      contactPhotoSrc: assetUrl('about-jordan.png'),
      contactPhotoAlt: 'Jordan Graham at an event',
      contactCtaLabel: 'Tell me about your event',
    },
    aboutPage: {
      pageTitle: 'About',
      introParagraph:
        'I\'m Jordan, a freelance events and project manager based in Amsterdam, with over a decade of experience bringing live and virtual experiences to life. From intimate brand launches to flagship summits drawing thousands of registrants, I handle everything from the first concept call to the final curtain.',
      bodyParagraphs: [
        'My background spans conference production, community building, content strategy and speaker management, so when I come on board, I bring a joined-up view of what makes an event actually work. I care about the detail, the delegate experience, and whether the whole thing lands the way you imagined it.',
        'Whether you\'re launching something new or levelling up an existing event, I\'d love to hear about it.',
      ],
      photoSrc: assetUrl('about-jordan.png'),
      photoAlt: 'Jordan Graham at an event',
      quoteBeforeTimeline: {
        text: 'Jordan brings a clarity to event production that is a complete lifeline for me.',
        author: 'Elizabeth Corse, Founder, DisCom',
      },
      timeline: [
        {
          key: 'spark',
          periodPlain: '2015 - 2017',
          title: 'The Spark',
          body: timelineSparkBody,
        },
        {
          key: 'momentum',
          periodPlain: '2017 - 2021',
          title: 'Building Momentum',
          body: timelineMomentumBody,
        },
        {
          key: 'myWay',
          periodBeforeHighlight: '2021 - ',
          periodHighlight: 'Now',
          title: 'Building It My Way',
          body: timelineMyWayBody,
        },
      ],
      quoteAfterTimeline: {
        text: 'She takes on all directions, gives great suggestions, is a fantastic mediator within small & larger teams and welcomes feedback with open arms. She. Is. The. Best.',
        author: 'Julie Adenuga',
      },
    },
    bookPage: {
      pageTitle: 'Tell me about your event',
      backLinkLabel: '← Back',
      yourDetailsLegend: 'Your Details',
      nameLabel: 'Name *',
      namePlaceholder: 'Your name',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'jane@email.com',
      phoneLabel: 'Phone Number *',
      phonePlaceholder: '+254 700 000 000',
      helpLegend: 'How can I help? *',
      helpOptions: [
        'Event Management',
        'Project Management',
        'Speaker Management',
        'Event Consultancy',
      ],
      eventLegend: 'Event Details *',
      eventDetailOptions: [
        'Corporate Party',
        'Conference/Summit',
        'Retreat',
        'Social Event',
        'Just an Idea',
      ],
      submitLabel: 'Submit booking request',
      submittingLabel: 'Sending…',
      successMessage:
        'Thank you — your booking request was sent. I\'ll be in touch within 24 hours.',
      privacyNotice: 'Your details are kept private and never shared with third parties.',
    },
    projects: projects.map((p) => ({
      ...p,
      imageSrc: assetUrl(p.image),
    })),
    clientLogos: fallbackClientLogos.map((logo, order) => ({
      order,
      src: logo.src,
      alt: logo.alt,
    })),
  };
}
