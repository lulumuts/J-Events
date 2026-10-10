import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'author',
      title: 'Attribution',
      type: 'string',
      description: 'Name and role, e.g. “Julie Adenuga” or “Elizabeth Corse, Founder, DisCom”.',
    }),
  ],
});
