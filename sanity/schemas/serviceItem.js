import { defineField, defineType } from 'sanity';

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'num',
      title: 'Number label',
      type: 'string',
      description: 'Display number, e.g. 01, 02.',
    }),
    defineField({
      name: 'name',
      title: 'Service name',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro sentence',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'items',
      title: 'Bullet points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
