import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline1',
      title: 'Hero headline (first line)',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline2',
      title: 'Hero headline (accent line)',
      type: 'string',
      description: 'Shown in the accent colour, e.g. “& Management”.',
    }),
    defineField({
      name: 'heroPills',
      title: 'Hero role pills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero button label',
      type: 'string',
    }),
    defineField({
      name: 'heroVideoMp4',
      title: 'Hero background video (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'heroVideoWebm',
      title: 'Hero background video (WebM)',
      type: 'file',
      options: { accept: 'video/webm' },
    }),
    defineField({
      name: 'introLead',
      title: 'Intro — lead paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introBody',
      title: 'Intro — body paragraph',
      type: 'blockContent',
    }),
    defineField({
      name: 'introLinkLabel',
      title: 'Intro link label',
      type: 'string',
    }),
    defineField({
      name: 'statsCitiesHeading',
      title: 'Stats — cities heading',
      type: 'string',
    }),
    defineField({
      name: 'statsCities',
      title: 'Stats — city names',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'clientLogosLabel',
      title: 'Client carousel label',
      type: 'string',
      description: 'Usually “Worked With”.',
    }),
    defineField({
      name: 'homeQuotes',
      title: 'Featured quotes on home',
      type: 'array',
      of: [{ type: 'testimonial' }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services section title',
      type: 'string',
    }),
    defineField({
      name: 'servicesIntroLead',
      title: 'Services intro (first sentence)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'servicesIntroRest',
      title: 'Services intro (rest of paragraph)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'servicesCtaLabel',
      title: 'Services link label',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services list',
      type: 'array',
      of: [{ type: 'serviceItem' }],
    }),
    defineField({
      name: 'workTitle',
      title: 'Work section title',
      type: 'string',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Homepage work grid (All tab)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      description: 'Only these projects show when visitors click “All”. Drag to reorder (usually four).',
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact section title',
      type: 'string',
    }),
    defineField({
      name: 'contactSubcopy',
      title: 'Contact section subcopy',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactPhoto',
      title: 'Contact section photo',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'contactCtaLabel',
      title: 'Contact button label',
      type: 'string',
    }),
  ],
});
