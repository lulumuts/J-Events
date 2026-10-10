import { defineField, defineType } from 'sanity';

export const projectDetails = defineType({
  name: 'projectDetails',
  title: 'Case study',
  type: 'object',
  fields: [
    defineField({
      name: 'role',
      title: 'Your role',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Example: Remote — London',
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'achievements',
      title: 'Key achievements',
      type: 'array',
      of: [{ type: 'achievement' }],
    }),
  ],
});
