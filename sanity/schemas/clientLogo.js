import { defineField, defineType } from 'sanity';

export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client logo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client name',
      type: 'string',
      description: 'Internal label for finding this logo in the Studio.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Logo image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', media: 'image', order: 'order' },
    prepare({ title, media, order }) {
      return { title: `${order ?? '?'}. ${title ?? 'Logo'}`, media };
    },
  },
});
