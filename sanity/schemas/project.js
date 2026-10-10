import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  description: 'One piece of work on the portfolio. Publish when ready; the website updates after deploy.',
  fields: [
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Click Generate — creates the link /work/… from the project name.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Photo description (for accessibility)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'meta',
      title: 'Short line under the title',
      type: 'string',
      description: 'Example: Climate · ChangeNOW Paris',
    }),
    defineField({
      name: 'category',
      title: 'Work filter tab',
      type: 'string',
      options: {
        list: [
          { title: 'Climate', value: 'Climate' },
          { title: 'Corporate', value: 'Corporate' },
          { title: 'Social', value: 'Social' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order on category tabs',
      type: 'number',
      description:
        'Used when someone clicks Climate, Corporate, or Social on the homepage (0 = first). The “All” tab is set on the Home page document.',
      initialValue: 99,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'details',
      title: 'Case study',
      type: 'projectDetails',
    }),
  ],
  orderings: [
    {
      title: 'Order on category tabs',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', category: 'category' },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});
