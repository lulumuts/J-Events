import { defineArrayMember, defineType } from 'sanity';

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Emphasis (accent)', value: 'emph' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [],
      },
    }),
  ],
});
