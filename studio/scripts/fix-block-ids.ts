/**
 * Fix for blocks created with a "." in their ID (e.g. "faqBlock.general").
 * Sanity treats dotted IDs as private, so the public website could not read
 * them. This copies each block to a dot-free ID ("faqBlock-general"), points
 * every page reference at the copy, then deletes the dotted original.
 * Safe to re-run.
 *
 * Run from studio/:  pnpm sanity exec scripts/fix-block-ids.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})
const BLOCK_TYPES = ['faqBlock', 'logoBlock', 'statsBlock', 'ctaBlock', 'testimonialBlock']
const REF_FIELDS = ['faqBlock', 'logoBlock', 'statsBlock', 'ctaBlock', 'testimonialBlock']

async function retry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastError: unknown
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      console.log(`  ${label}: attempt ${attempt} failed, retrying...`)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
  throw lastError
}

type Doc = Record<string, unknown> & {_id: string; _type: string}

async function main() {
  const dotted = await retry('load blocks', () =>
    client.fetch<Doc[]>(`*[_type in $types && _id match "*.*" && !(_id in path("drafts.**"))]`, {
      types: BLOCK_TYPES,
    }),
  )
  if (dotted.length === 0) {
    console.log('No dotted block IDs found. Nothing to do.')
    return
  }

  const rename = new Map(dotted.map((doc) => [doc._id, doc._id.replace(/\./g, '-')]))

  // 1. Copy each block to its new ID.
  const tx = client.transaction()
  for (const doc of dotted) {
    const copy: Record<string, unknown> = {...doc, _id: rename.get(doc._id)}
    for (const key of ['_rev', '_createdAt', '_updatedAt']) delete copy[key]
    tx.createOrReplace(copy as Doc)
  }
  await retry('copy blocks', () => tx.commit())
  console.log(`Copied: ${[...rename.values()].join(', ')}`)

  // 2. Repoint page references.
  const pages = await retry('load pages', () =>
    client.fetch<Doc[]>(`*[_id in ["homePage", "aboutPage", "servicesPage", "contactPage"]]`),
  )
  for (const page of pages) {
    const set: Record<string, unknown> = {}
    for (const field of REF_FIELDS) {
      const current = page[field] as {_ref?: string} | undefined
      const next = current?._ref ? rename.get(current._ref) : undefined
      if (next) set[field] = {_type: 'reference', _ref: next}
    }
    if (Object.keys(set).length === 0) continue
    await retry(`patch ${page._id}`, () => client.patch(page._id).set(set).commit())
    console.log(
      `${page._id}: now points to ${Object.values(set)
        .map((r) => (r as {_ref: string})._ref)
        .join(', ')}`,
    )
  }

  // 3. Delete the dotted originals (nothing references them any more).
  for (const oldId of rename.keys()) {
    await retry(`delete ${oldId}`, () => client.delete(oldId))
  }
  console.log(`Deleted: ${[...rename.keys()].join(', ')}`)
}

// A failure rejects and the CLI exits with an error.
main()
