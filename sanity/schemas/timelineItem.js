import { defineField, defineType } from 'sanity';

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Timeline entry',
  type: 'object',
  fields: [
    defineField({
      name: 'periodPlain',
      title: 'Dates',
      type: 'string',
      description: 'Example: 2015 - 2017 or 2021 - Now',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'blockContent',
    }),
  ],
});
