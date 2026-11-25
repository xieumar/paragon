import {defineField, defineType} from 'sanity'

/** A call-to-action button: label + destination. */
export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'href',
      title: 'Destination',
      type: 'string',
      description: 'Use /page for pages on this site, or a full https:// address.',
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
