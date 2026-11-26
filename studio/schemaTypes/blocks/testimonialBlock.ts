import {defineArrayMember, defineField, defineType} from 'sanity'
import {countItems, plural, selectItems} from './previewCount'

/** Reusable testimonial slider: a chosen set of client quotes. */
export const testimonialBlock = defineType({
  name: 'testimonialBlock',
  title: 'Testimonial slider',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (for editors only)',
      type: 'string',
      description:
        'Only shown in the Studio, e.g. "Featured testimonials". Not shown on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      initialValue: 'Testimonials',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'heading',
      type: 'string',
      initialValue: 'What our clients say',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      description:
        'Pick up to 8. With more than one, the website shows a slider. Create new quotes in the "Testimonial" list.',
      validation: (rule) => rule.max(8),
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
    }),
  ],
  preview: {
    select: {title: 'name', ...selectItems('testimonials')},
    prepare: (selection) => ({
      title: selection.title as string,
      subtitle: plural(countItems(selection), 'testimonial'),
    }),
  },
})
