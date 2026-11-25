import {defineField, defineType} from 'sanity'

/** A labelled link: internal path (/about), full URL, email or phone. */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Destination',
      type: 'string',
      description:
        'Use /page for pages on this site (e.g. /about), or a full address: https://…, mailto:…, tel:…',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          const ok = /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/.test(value)
          return ok || 'Start with / for site pages, or use https://, mailto: or tel:'
        }),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})
