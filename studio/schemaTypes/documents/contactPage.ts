import {defineArrayMember, defineField, defineType} from 'sanity'
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
    {name: 'next', title: 'What happens next'},
    {name: 'faq', title: 'FAQ'},
    {name: 'extra', title: 'More sections'},
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
        defineField({
          name: 'image',
          type: 'imageWithAlt',
          description: 'Landscape photo shown beside the heading, e.g. your office or team.',
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

    defineField({
      name: 'nextSteps',
      title: 'What happens next',
      type: 'object',
      group: 'next',
      description:
        'A short numbered list reassuring people what happens after they write. Leave the heading empty to hide it.',
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
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'items',
          title: 'Steps',
          type: 'array',
          validation: (rule) => rule.max(5),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'step',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  validation: (rule) => rule.required().max(60),
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required().max(240),
                }),
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'testimonialBlock',
      title: 'Testimonials',
      type: 'reference',
      to: [{type: 'testimonialBlock'}],
      group: 'extra',
      description: 'Pick a testimonial slider. Leave empty to hide it.',
    }),
    defineField({
      name: 'logoBlock',
      title: 'Client logos',
      type: 'reference',
      to: [{type: 'logoBlock'}],
      group: 'extra',
      description: 'Pick a logo banner to show here. Leave empty to hide it.',
    }),
    defineField({
      name: 'statsBlock',
      title: 'Stats',
      type: 'reference',
      to: [{type: 'statsBlock'}],
      group: 'extra',
      description: 'Pick a set of headline numbers. Leave empty to hide it.',
    }),
    defineField({
      name: 'faqBlock',
      title: 'FAQ',
      type: 'reference',
      to: [{type: 'faqBlock'}],
      group: 'faq',
      description:
        'Pick a FAQ set to show here. Create or edit sets under "Reusable blocks" in the sidebar. Leave empty to hide this section.',
    }),

    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Contact page'})},
})
