import {defineField, defineType} from 'sanity'
import {singletonReadOnly} from '../singleton'

/** Singleton: the Contact page. Office details come from "Site settings". */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  readOnly: singletonReadOnly('contactPage'),
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'form', title: 'Enquiry form'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'header',
      title: 'Page header',
      type: 'object',
      group: 'header',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Small label',
          type: 'string',
          validation: (rule) => rule.max(40),
        }),
        defineField({
          name: 'heading',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'intro',
          title: 'Intro text',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(300),
        }),
      ],
    }),

    defineField({
      name: 'form',
      title: 'Enquiry form',
      type: 'object',
      group: 'form',
      description: 'Wording around the enquiry form. The fields themselves are fixed.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Form heading',
          type: 'string',
          validation: (rule) => rule.max(80),
        }),
        defineField({
          name: 'submitLabel',
          title: 'Submit button label',
          type: 'string',
          initialValue: 'Send message',
          validation: (rule) => rule.max(30),
        }),
        defineField({
          name: 'consentLabel',
          title: 'Consent checkbox text',
          type: 'string',
          description: 'Shown next to the required consent checkbox.',
          initialValue: 'I agree to be contacted about my enquiry.',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'successTitle',
          title: 'Success title',
          type: 'string',
          initialValue: 'Thank you!',
          validation: (rule) => rule.max(80),
        }),
        defineField({
          name: 'successMessage',
          title: 'Success message',
          type: 'text',
          rows: 2,
          initialValue: 'Your message has been sent. We will get back to you shortly.',
          validation: (rule) => rule.max(240),
        }),
      ],
    }),

    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Contact page'})},
})
