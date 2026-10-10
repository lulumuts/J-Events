/**
 * One-off migration: current site copy + local images → Sanity dataset.
 *
 * Requires in .env (not committed):
 *   SANITY_PROJECT_ID or VITE_SANITY_PROJECT_ID
 *   SANITY_DATASET or VITE_SANITY_DATASET (default production)
 *   SANITY_API_TOKEN (Editor token with write access)
 */
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Agent, setGlobalDispatcher } from 'undici';
import { allFeaturedSlugs, categories, projects } from '../src/data/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

dotenv.config({ path: path.join(root, '.env') });

/** Large hero videos need longer HTTP timeouts than undici’s default. */
const UPLOAD_TIMEOUT_MS = 15 * 60 * 1000;
setGlobalDispatcher(
  new Agent({
    headersTimeout: UPLOAD_TIMEOUT_MS,
    bodyTimeout: UPLOAD_TIMEOUT_MS,
    connectTimeout: 60_000,
  }),
);

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Set SANITY_PROJECT_ID (or VITE_SANITY_PROJECT_ID) and SANITY_API_TOKEN in .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
  timeout: UPLOAD_TIMEOUT_MS,
});

const introBody = [
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
      { _type: 'span', text: ' experience of your guest.' },
    ],
  },
];

const timelineBodies = {
  spark: [
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
  ],
  momentum: [
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
  ],
  myWay: [
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
  ],
};

async function uploadFile(type, filePath) {
  const absolute = path.join(root, filePath);
  if (!fs.existsSync(absolute)) {
    console.warn(`  skip missing file: ${filePath}`);
    return null;
  }
  const { size } = fs.statSync(absolute);
  const sizeMb = (size / (1024 * 1024)).toFixed(1);
  console.log(`  uploading ${filePath} (${sizeMb} MB)…`);
  const stream = fs.createReadStream(absolute);
  return client.assets.upload(type, stream, {
    filename: path.basename(absolute),
    timeout: UPLOAD_TIMEOUT_MS,
  });
}

async function uploadImage(filePath) {
  return uploadFile('image', filePath);
}

function imageField(asset, alt) {
  if (!asset?._id) return undefined;
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  };
}

function fileField(asset) {
  if (!asset?._id) return undefined;
  return {
    _type: 'file',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

async function seed() {
  console.log(`Seeding ${projectId}/${dataset}…`);

  const skipHeroVideos = process.env.SEED_SKIP_HERO_VIDEOS === 'true';
  let heroMp4;
  let heroWebm;
  if (skipHeroVideos) {
    console.log('  SEED_SKIP_HERO_VIDEOS=true — hero videos left on local /public paths');
  } else {
    heroMp4 = await uploadFile('file', 'public/hero/hero.mp4');
    heroWebm = await uploadFile('file', 'public/hero/hero.webm');
  }
  const aboutPhoto = await uploadImage('public/about-jordan.png');

  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
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
  });

  const logoFiles = [
    { order: 0, name: "Julie's Top 5 Show", file: 'src/assets/logos/top5.png', alt: "Julie's Top 5 Show" },
    { order: 1, name: 'Roundhouse', file: 'src/assets/logos/roundhouse-logo.png', alt: 'Roundhouse' },
    { order: 2, name: 'Construction CFO Summit', file: 'src/assets/logos/construction-cfo-summit-logo.png', alt: 'Construction CFO Summit' },
    { order: 3, name: 'Now You Know', file: 'src/assets/logos/now-you-know-logo.png', alt: 'Now You Know' },
    { order: 4, name: 'The Power Within You', file: 'src/assets/logos/power-within-you-logo.png', alt: 'The Power Within You with Mamta Gera' },
    { order: 5, name: 'Main Street Events', file: 'src/assets/logos/main-street-events-logo.png', alt: 'Main Street Events Limited' },
    { order: 6, name: 'Collections', file: 'src/assets/logos/collections-logo.png', alt: 'Collections' },
    { order: 7, name: 'E3G', file: 'src/assets/logos/e3g-logo.png', alt: 'E3G' },
    { order: 8, name: 'DisCom', file: 'src/assets/logos/discom-logo.png', alt: 'DisCom' },
    { order: 9, name: 'Climate Founders Week', file: 'src/assets/logos/climate-founders-week-logo.png', alt: 'Climate Founders Week' },
    { order: 10, name: 'BRAVE Leadership Summit', file: 'src/assets/logos/brave-leadership-summit-logo.png', alt: 'BRAVE Leadership Summit' },
  ];

  for (const logo of logoFiles) {
    const asset = await uploadImage(logo.file);
    await client.createOrReplace({
      _id: `clientLogo-${logo.order}`,
      _type: 'clientLogo',
      name: logo.name,
      order: logo.order,
      image: imageField(asset, logo.alt),
    });
  }

  for (let index = 0; index < projects.length; index += 1) {
    const p = projects[index];
    const publicImage = path.join('public', p.image);
    const asset = await uploadImage(publicImage);
    const doc = {
      _id: `project-${p.slug}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      order: index,
      meta: p.meta,
      category: p.category,
      coverImage: imageField(asset, p.imageAlt),
    };
    if (p.titleLines?.length) doc.titleLines = p.titleLines;
    if (p.description) doc.description = p.description;
    if (p.details) doc.details = p.details;
    await client.createOrReplace(doc);
    console.log(`  project: ${p.slug}`);
  }

  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroHeadline1: 'J Events',
    heroHeadline2: '& Management',
    heroPills: ['Event planner', 'Project manager', 'Content producer'],
    heroCtaLabel: 'Book a consultation',
    heroVideoMp4: fileField(heroMp4),
    heroVideoWebm: fileField(heroWebm),
    introLead:
      'Welcome to J Ideas & Management, where I specialise in orchestrating unforgettable experiences and seamlessly executing projects through a unique skillset providing a holistic, 360 view on events & projects.',
    introBody,
    introLinkLabel: 'About Jordan',
    statsCitiesHeading: 'Global events across',
    statsCities: ['London', 'Amsterdam', 'Paris', 'San Francisco', 'New York'],
    clientLogosLabel: 'Worked With',
    homeQuotes: [
      {
        _key: 'q1',
        text: 'Her gift of distilling & summarising information into useful action points is unmatched',
        author: 'Julie Adenuga',
      },
      {
        _key: 'q2',
        text: 'Jordan brings a clarity to event production that is a complete lifeline for me.',
        author: 'Elizabeth Corse, Founder, DisCom',
      },
      {
        _key: 'q3',
        text: 'She helped me turn around a 14 hour shoot, with a video, wardrobe and make up crew plus 12 talent bookings in less than three weeks.',
        author: 'Julie Adenuga',
      },
    ],
    servicesTitle: 'Services',
    servicesIntroLead: 'People are the real formula for success, and that\'s where I come in.',
    servicesIntroRest:
      'With experience spanning event planning, content creation, and project management, I help turn your ideas into events that resonate, while keeping a genuine pulse on your community.',
    servicesCtaLabel: 'Book a consultation',
    services: [
      {
        _key: 's1',
        num: '01',
        name: 'Event Management',
        intro: 'Curating, planning & executing your event idea with:',
        items: ['Strategic & actionable planning', 'Logistical mastery', 'Team management'],
      },
      {
        _key: 's2',
        num: '02',
        name: 'Project Management',
        intro: 'Guiding your projects with your commitment & creativity and:',
        items: ['Creative project planning', 'Team support', 'Confident, clear communication'],
      },
      {
        _key: 's3',
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
        _key: 's4',
        num: '04',
        name: 'Event Consultancy',
        intro: "Planting the seed of your vision with a clear outline of what's possible with:",
        items: ['Insightful research', 'Creative action plans', 'The Journey to reality'],
      },
    ],
    workTitle: 'Work',
    featuredProjects: allFeaturedSlugs.map((slug) => ({
      _key: slug,
      _type: 'reference',
      _ref: `project-${slug}`,
    })),
    contactTitle: 'Contact',
    contactSubcopy:
      'Reach out directly, or share your event details and I\'ll be in touch within 24 hours.',
    contactPhoto: imageField(aboutPhoto, 'Jordan Graham at an event'),
    contactCtaLabel: 'Tell me about your event',
  });

  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    pageTitle: 'About',
    introParagraph:
      'I\'m Jordan, a freelance events and project manager based in Amsterdam, with over a decade of experience bringing live and virtual experiences to life. From intimate brand launches to flagship summits drawing thousands of registrants, I handle everything from the first concept call to the final curtain.',
    bodyParagraphs: [
      'My background spans conference production, community building, content strategy and speaker management, so when I come on board, I bring a joined-up view of what makes an event actually work. I care about the detail, the delegate experience, and whether the whole thing lands the way you imagined it.',
      'Whether you\'re launching something new or levelling up an existing event, I\'d love to hear about it.',
    ],
    photo: imageField(aboutPhoto, 'Jordan Graham at an event'),
    quoteBeforeTimeline: {
      text: 'Jordan brings a clarity to event production that is a complete lifeline for me.',
      author: 'Elizabeth Corse, Founder, DisCom',
    },
    timeline: [
      {
        _key: 'spark',
        periodPlain: '2015 - 2017',
        title: 'The Spark',
        body: timelineBodies.spark,
      },
      {
        _key: 'momentum',
        periodPlain: '2017 - 2021',
        title: 'Building Momentum',
        body: timelineBodies.momentum,
      },
      {
        _key: 'myWay',
        periodBeforeHighlight: '2021 - ',
        periodHighlight: 'Now',
        title: 'Building It My Way',
        body: timelineBodies.myWay,
      },
    ],
    quoteAfterTimeline: {
      text: 'She takes on all directions, gives great suggestions, is a fantastic mediator within small & larger teams and welcomes feedback with open arms. She. Is. The. Best.',
      author: 'Julie Adenuga',
    },
  });

  await client.createOrReplace({
    _id: 'bookPage',
    _type: 'bookPage',
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
  });

  console.log('Done. Open /studio to review content.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
