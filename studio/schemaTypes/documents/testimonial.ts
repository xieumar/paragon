import {defineField, defineType} from 'sanity'

/** A client quote, shown on the home page. */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'role', title: 'Job title', type: 'string'}),
    defineField({name: 'company', type: 'string'}),
    defineField({
      name: 'photo',
      type: 'imageWithAlt',
      description: 'Optional portrait of the person.',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'company', media: 'photo'},
  },
})
