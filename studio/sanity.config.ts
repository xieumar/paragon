import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SINGLETON_TYPES, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'paragon',

  projectId: 'yqc9zm5m',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "+" menu.
    templates: (templates) =>
      templates.filter(
        ({schemaType}) => !(SINGLETON_TYPES as readonly string[]).includes(schemaType),
      ),
  },

  document: {
    // Singletons can't be duplicated or deleted.
    actions: (input, {schemaType}) =>
      (SINGLETON_TYPES as readonly string[]).includes(schemaType)
        ? input.filter(
            ({action}) => action && !['duplicate', 'delete', 'unpublish'].includes(action),
          )
        : input,
  },
})
