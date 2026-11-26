/**
 * Repairs singleton documents (see schemaTypes/singleton.ts).
 *
 * For each singleton type: keeps the most recently edited published copy,
 * saves it under the fixed ID, and deletes the other copies.
 *
 * Run from studio/:  pnpm singletons:fix
 */
import {getCliClient} from 'sanity/cli'

const SINGLETON_TYPES = ['siteSettings', 'homePage', 'aboutPage', 'contactPage']
const client = getCliClient({apiVersion: '2025-01-01'})

async function main() {
  for (const type of SINGLETON_TYPES) {
    const published = await client.fetch(
      `*[_type == $type && !(_id in path("drafts.**"))] | order(_updatedAt desc)`,
      {type},
    )
    const drafts = await client.fetch(
      `*[_type == $type && _id in path("drafts.**") && _id != $draftId]._id`,
      {type, draftId: `drafts.${type}`},
    )

    if (published.length === 0) {
      console.log(`${type}: nothing published yet`)
    } else if (published.length === 1 && published[0]._id === type) {
      console.log(`${type}: OK`)
    } else {
      const newest = published[0]
      const content: Record<string, unknown> = {...newest}
      for (const key of ['_rev', '_createdAt', '_updatedAt']) delete content[key]
      await client.createOrReplace({...content, _type: type, _id: type})
      for (const doc of published) {
        if (doc._id !== type) await client.delete(doc._id)
      }
      console.log(
        `${type}: merged ${published.length} copies into "${type}" (kept the newest, edited ${newest._updatedAt})`,
      )
    }

    if (drafts.length > 0) {
      console.log(
        `${type}: unpublished drafts under other IDs (publish or delete in Studio): ${drafts.join(', ')}`,
      )
    }
  }
}

// A failure rejects and the CLI exits with an error.
main()
