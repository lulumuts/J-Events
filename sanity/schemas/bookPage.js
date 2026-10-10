import { defineField, defineType } from 'sanity';

export const bookPage = defineType({
  name: 'bookPage',
  title: 'Book / contact form page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page title',
      type: 'string',
    }),
    defineField({
      name: 'backLinkLabel',
      title: 'Back link label',
      type: 'string',
    }),
    defineField({
      name: 'yourDetailsLegend',
      title: '“Your details” section title',
      type: 'string',
    }),
    defineField({
      name: 'nameLabel',
      title: 'Name field label',
      type: 'string',
    }),
    defineField({
      name: 'namePlaceholder',
      title: 'Name placeholder',
      type: 'string',
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email field label',
      type: 'string',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email placeholder',
      type: 'string',
    }),
    defineField({
      name: 'phoneLabel',
      title: 'Phone field label',
      type: 'string',
    }),
    defineField({
      name: 'phonePlaceholder',
      title: 'Phone placeholder',
      type: 'string',
    }),
    defineField({
      name: 'helpLegend',
      title: '“How can I help?” section title',
      type: 'string',
    }),
    defineField({
      name: 'helpOptions',
      title: 'Help options (checkboxes)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'eventLegend',
      title: '“Event details” section title',
      type: 'string',
    }),
    defineField({
      name: 'eventDetailOptions',
      title: 'Event detail options (checkboxes)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit button label',
      type: 'string',
    }),
    defineField({
      name: 'submittingLabel',
      title: 'Submit button label while sending',
      type: 'string',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success message',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'privacyNotice',
      title: 'Privacy notice',
      type: 'text',
      rows: 2,
    }),
  ],
});
