import {ctaBlock} from './ctaBlock'
import {faqBlock} from './faqBlock'
import {logoBlock} from './logoBlock'
import {statsBlock} from './statsBlock'
import {testimonialBlock} from './testimonialBlock'

/** Reusable content blocks. Pages pick them by reference. */
export const blockTypes = [faqBlock, logoBlock, statsBlock, ctaBlock, testimonialBlock]

/** Block types as shown in the sidebar's "Reusable blocks" folder. */
export const BLOCK_LIST = [
  {type: 'faqBlock', title: 'FAQ sets'},
  {type: 'logoBlock', title: 'Logo banners'},
  {type: 'statsBlock', title: 'Stats'},
  {type: 'ctaBlock', title: 'Calls to action'},
  {type: 'testimonialBlock', title: 'Testimonial sliders'},
] as const
