import {defineField, defineType} from 'sanity'

/** An image that always carries alt text (accessibility) and supports hotspot/crop. */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description:
        'Describe the image for people using screen readers. Keep it short and specific.',
      validation: (rule) => rule.required().max(150),
    }),
  ],
})
