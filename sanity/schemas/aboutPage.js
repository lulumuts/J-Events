import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page title',
      type: 'string',
    }),
    defineField({
      name: 'introParagraph',
      title: 'Intro paragraph',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Additional paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'photo',
      title: 'Portrait photo',
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
      name: 'quoteBeforeTimeline',
      title: 'Quote above timeline',
      type: 'testimonial',
    }),
    defineField({
      name: 'timeline',
      title: 'Career timeline',
      type: 'array',
      of: [{ type: 'timelineItem' }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'quoteAfterTimeline',
      title: 'Quote below timeline',
      type: 'testimonial',
    }),
  ],
});
