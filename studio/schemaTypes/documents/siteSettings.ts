import {defineArrayMember, defineField, defineType} from 'sanity'
import {singletonReadOnly} from '../singleton'

/** Singleton: site-wide settings (one document, edited from the Studio sidebar). */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  readOnly: singletonReadOnly('siteSettings'),
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'contact', title: 'Contact & social'},
    {name: 'seo', title: 'Default SEO'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      group: 'general',
      description: 'A short line describing the company.',
    }),
    defineField({
      name: 'logo',
      type: 'imageWithAlt',
      group: 'general',
      description:
        'Shown in the header and footer. SVG or PNG with a transparent background works best.',
    }),
    defineField({
      name: 'headerCta',
      title: 'Header button',
      type: 'cta',
      group: 'navigation',
      description: 'Optional button shown at the right of the header. Leave empty to hide it.',
    }),
    defineField({
      name: 'navigation',
      title: 'Main navigation',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({type: 'link'})],
      validation: (rule) => rule.max(7),
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      group: 'navigation',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              description:
                'Optional free text shown under the column title, e.g. an address. Line breaks are kept.',
            }),
            defineField({
              name: 'links',
              type: 'array',
              of: [defineArrayMember({type: 'link'})],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links',
      type: 'array',
      group: 'navigation',
      description: 'Shown at the very bottom of the footer (e.g. Privacy, Terms).',
      of: [defineArrayMember({type: 'link'})],
    }),
    defineField({
      name: 'contact',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'email',
          type: 'string',
          validation: (rule) =>
            rule.custom((value) =>
              !value || /^\S+@\S+\.\S+$/.test(value) ? true : 'Enter a valid email address',
            ),
        }),
        defineField({name: 'phone', type: 'string'}),
        defineField({name: 'address', type: 'text', rows: 3}),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'social',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: ['LinkedIn', 'X', 'Facebook', 'Instagram', 'YouTube'],
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['https']}),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
      description: 'Used when a page does not set its own SEO.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
