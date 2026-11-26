/**
 * One-off migration: moves inline page sections into reusable blocks.
 *
 *   Home page FAQ            -> FAQ set "General FAQ"
 *   Home page client logos   -> Logo banner "Clients"
 *   Home page stats          -> Stats "Company stats"
 *   Home page testimonial(s) -> Testimonial slider "Client testimonials"
 *                               (all published testimonials, up to 8)
 *   Each page's closing CTA  -> Call to action blocks
 *   Services / Contact FAQ   -> their own FAQ sets (if they had content)
 *
 * Then every page points at the blocks (Services, About and Contact share
 * Home's blocks where they had none of their own) and the old inline fields
 * are removed. Safe to re-run: existing blocks are never overwritten and page
 * references are only set where missing.
 *
 * Run from studio/:  pnpm sanity exec scripts/migrate-to-blocks.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

type Doc = Record<string, unknown> & {_id: string}

const client = getCliClient({apiVersion: '2025-01-01'})

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

const ref = (id: string) => ({_type: 'reference', _ref: id})
const hasItems = (value: unknown) => Array.isArray(value) && value.length > 0
const obj = (value: unknown) => (value ?? {}) as Record<string, unknown>

async function main() {
  const pages = await retry('load pages', () =>
    client.fetch<Doc[]>(`*[_id in ["homePage", "aboutPage", "servicesPage", "contactPage"]]`),
  )
  const byId = Object.fromEntries(pages.map((page) => [page._id, page]))
  const home = byId.homePage
  const about = byId.aboutPage
  const services = byId.servicesPage
  const contact = byId.contactPage
  if (!home) throw new Error('homePage not found; nothing to migrate.')

  const testimonialIds = await retry('load testimonials', () =>
    client.fetch<string[]>(
      `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...8]._id`,
    ),
  )

  // 1. Blocks (created only if they don't exist yet).
  const blocks: Doc[] = []
  const created: string[] = []
  const addBlock = (doc: Doc, when: boolean) => {
    if (when) {
      blocks.push(doc)
      created.push(doc._id)
    }
  }

  const homeFaq = obj(home.faq)
  addBlock(
    {
      _id: 'faqBlock-general',
      _type: 'faqBlock',
      name: 'General FAQ',
      eyebrow: homeFaq.eyebrow,
      heading: homeFaq.heading,
      intro: homeFaq.intro,
      items: homeFaq.items,
    },
    Boolean(homeFaq.heading) || hasItems(homeFaq.items),
  )
  addBlock(
    {_id: 'logoBlock-clients', _type: 'logoBlock', name: 'Clients', logos: home.clientLogos},
    hasItems(home.clientLogos),
  )
  addBlock(
    {_id: 'statsBlock-company', _type: 'statsBlock', name: 'Company stats', items: home.stats},
    hasItems(home.stats),
  )
  addBlock(
    {
      _id: 'testimonialBlock-clients',
      _type: 'testimonialBlock',
      name: 'Client testimonials',
      eyebrow: 'Testimonials',
      heading: 'What our clients say',
      testimonials: testimonialIds.map((id) => ({...ref(id), _key: id.slice(0, 12)})),
    },
    testimonialIds.length > 0,
  )

  const ctaFrom = (id: string, name: string, band: unknown) => {
    const cta = obj(band)
    addBlock(
      {_id: id, _type: 'ctaBlock', name, heading: cta.heading, text: cta.text, cta: cta.cta},
      Boolean(cta.heading),
    )
    return Boolean(cta.heading)
  }
  const homeCta = ctaFrom('ctaBlock-home', 'Home call to action', home.ctaBand)
  const aboutCta = ctaFrom('ctaBlock-about', 'About call to action', about?.ctaBand)
  const servicesCta = ctaFrom('ctaBlock-services', 'Services call to action', services?.ctaBand)

  const faqFrom = (id: string, name: string, faq: unknown) => {
    const f = obj(faq)
    const ok = Boolean(f.heading) && hasItems(f.items)
    addBlock(
      {
        _id: id,
        _type: 'faqBlock',
        name,
        eyebrow: f.eyebrow,
        heading: f.heading,
        intro: f.intro,
        items: f.items,
      },
      ok,
    )
    return ok
  }
  const servicesFaq = faqFrom('faqBlock-services', 'Services FAQ', services?.faq)
  const contactFaq = faqFrom('faqBlock-contact', 'Contact FAQ', contact?.faq)

  if (blocks.length > 0) {
    const tx = client.transaction()
    for (const block of blocks) tx.createIfNotExists(block as Doc & {_type: string})
    await retry('create blocks', () => tx.commit())
  }
  console.log(`Blocks ensured: ${created.join(', ') || 'none (already migrated)'}`)

  // 2. Point pages at blocks; remove the old inline fields.
  const exists = new Set(
    await retry('check blocks', () =>
      client.fetch<string[]>(`*[_id in $ids]._id`, {
        ids: [
          'faqBlock-general',
          'logoBlock-clients',
          'statsBlock-company',
          'testimonialBlock-clients',
          'ctaBlock-home',
          'ctaBlock-about',
          'ctaBlock-services',
          'faqBlock-services',
          'faqBlock-contact',
        ],
      }),
    ),
  )
  const pick = (...ids: string[]) => ids.find((id) => exists.has(id))
  const refs = (map: Record<string, string | undefined>) =>
    Object.fromEntries(
      Object.entries(map)
        .filter(([, id]) => id)
        .map(([field, id]) => [field, ref(id as string)]),
    )

  const plan: Array<{id: string; set: Record<string, unknown>; unset: string[]}> = [
    {
      id: 'homePage',
      set: refs({
        faqBlock: pick('faqBlock-general'),
        logoBlock: pick('logoBlock-clients'),
        statsBlock: pick('statsBlock-company'),
        testimonialBlock: pick('testimonialBlock-clients'),
        ctaBlock: pick('ctaBlock-home'),
      }),
      unset: ['faq', 'clientLogos', 'stats', 'ctaBand', 'featuredTestimonial'],
    },
    {
      id: 'aboutPage',
      set: refs({
        testimonialBlock: pick('testimonialBlock-clients'),
        ctaBlock: aboutCta ? pick('ctaBlock-about') : pick('ctaBlock-home'),
      }),
      unset: ['ctaBand'],
    },
    {
      id: 'servicesPage',
      set: refs({
        testimonialBlock: pick('testimonialBlock-clients'),
        logoBlock: pick('logoBlock-clients'),
        faqBlock: servicesFaq ? pick('faqBlock-services') : pick('faqBlock-general'),
        ctaBlock: servicesCta
          ? pick('ctaBlock-services')
          : homeCta
            ? pick('ctaBlock-home')
            : undefined,
      }),
      unset: ['faq', 'ctaBand'],
    },
    {
      id: 'contactPage',
      set: refs({
        testimonialBlock: pick('testimonialBlock-clients'),
        logoBlock: pick('logoBlock-clients'),
        faqBlock: contactFaq ? pick('faqBlock-contact') : pick('faqBlock-general'),
      }),
      unset: ['faq'],
    },
  ]

  for (const {id, set, unset} of plan) {
    if (!byId[id]) {
      console.log(`${id}: not found, skipped`)
      continue
    }
    await retry(`patch ${id}`, () => client.patch(id).setIfMissing(set).unset(unset).commit())
    console.log(`${id}: linked ${Object.keys(set).join(', ') || 'nothing'}; removed old fields`)
  }
}

// A failure rejects and the CLI exits with an error.
main()
