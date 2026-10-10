import { defineField, defineType } from 'sanity';

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Point title',
      type: 'string',
    }),
    defineField({
      name: 'detail',
      title: 'Explanation',
      type: 'text',
      rows: 3,
    }),
  ],
});
