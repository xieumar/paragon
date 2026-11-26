/**
 * Sanity previews can't select a whole array, so `count(items)` isn't
 * available. Instead select the first N entries individually and count the
 * ones that exist. N matches the largest `max()` used by the blocks.
 */
const MAX = 12

/** Preview `select` entries for the first MAX items of an array field. */
export function selectItems(field: string) {
  return Object.fromEntries(Array.from({length: MAX}, (_, i) => [`_item${i}`, `${field}.${i}`]))
}

/** Counts the selected items from `selectItems`. */
export function countItems(selection: Record<string, unknown>) {
  return Object.keys(selection).filter((key) => key.startsWith('_item') && selection[key] != null)
    .length
}

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
