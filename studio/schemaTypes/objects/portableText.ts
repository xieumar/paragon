import {defineArrayMember, defineField, defineType} from 'sanity'

/** Rich text used for long-form content (articles, case studies, legal pages). */
export const portableText = defineType({
  name: 'portableText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bulleted', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'Destination',
                type: 'string',
                description: 'Use /page for pages on this site, or a full https:// address.',
                validation: (rule) =>
                  rule.required().custom((value) => {
                    if (!value) return true
                    const ok = /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/.test(value)
                    return ok || 'Start with / or use https://, mailto: or tel:'
                  }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({type: 'imageWithAlt'}),
  ],
})
