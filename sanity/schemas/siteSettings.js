import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Browser tab title',
      type: 'string',
      description: 'Shown in the browser tab and search results title.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Site description (SEO)',
      type: 'text',
      rows: 3,
      description: 'Short summary for search engines and link previews.',
    }),
    defineField({
      name: 'navLogoText',
      title: 'Navigation logo text',
      type: 'string',
    }),
    defineField({
      name: 'navCtaLabel',
      title: 'Navigation button label',
      type: 'string',
      description: 'Usually “Book now”.',
    }),
    defineField({
      name: 'footerLogoText',
      title: 'Footer logo text',
      type: 'string',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer copyright line',
      type: 'string',
      description: 'Example: © 2025 · All rights reserved',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhoneDisplay',
      title: 'Contact phone (display)',
      type: 'string',
      description: 'How the phone number appears on the site.',
    }),
    defineField({
      name: 'contactPhoneTel',
      title: 'Contact phone (for links)',
      type: 'string',
      description: 'Digits only or tel: format, e.g. +254700000000',
    }),
    defineField({
      name: 'workCategories',
      title: 'Work filter categories',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'First item should stay “All”; the rest match project categories.',
    }),
  ],
});
