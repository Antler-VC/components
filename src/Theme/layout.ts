import { spacingFn } from './spacing';

export const GRID_GUTTER_MOBILE = spacingFn('xs') as number;
export const GRID_GUTTER_DESKTOP = spacingFn('m') as number;
export const GRID_MARGIN_MOBILE = GRID_GUTTER_MOBILE / 2;
export const GRID_MARGIN_DESKTOP = GRID_GUTTER_DESKTOP / 2;

// Width of a card on a 320px-wide screen (smallest iPhone size)
// including grid magin
export const CARD_MIN_WIDTH = 320 - GRID_MARGIN_MOBILE * 2;
// Max width of a single card in the mobile breakpoint (at sm - 1)
export const CARD_MAX_WIDTH = 488;

export const SIDEBAR_WIDTH = 304;

// Breakpoints are based on CARD_MIN_WIDTH and number of cards in a row
export const breakpoints = {
  xs: 0, // Must be 0. Realistically the minimum width we support is 320px
  sm: CARD_MIN_WIDTH * 2 + GRID_GUTTER_MOBILE * 1 + GRID_MARGIN_MOBILE * 2, // 640
  // Switch to desktop spacing at md breakpoint and above
  md: CARD_MIN_WIDTH * 3 + GRID_GUTTER_DESKTOP * 2 + GRID_MARGIN_DESKTOP * 2, // 1008
  lg: CARD_MIN_WIDTH * 4 + GRID_GUTTER_DESKTOP * 3 + GRID_MARGIN_DESKTOP * 2, // 1344
  // Show left nav sidebar at xl breakpoint and above
  xl:
    SIDEBAR_WIDTH + // xl total = 1680
    (spacingFn('l') as number) + // left margin
    CARD_MIN_WIDTH * 4 + // 4 cards
    GRID_GUTTER_DESKTOP * 3 + // 3 gutters
    GRID_MARGIN_DESKTOP, // right margin
};

// Max width of main grid content, excluding sidebar and sidebar spacing
export const CONTENT_MAX_WIDTH = // 2416 - 304 - 32 = 2080
  CARD_MAX_WIDTH * 4 + GRID_GUTTER_DESKTOP * 3 + GRID_MARGIN_DESKTOP * 2;

export const LAYOUT_CSS_VARS = {
  '--grid-gutter': GRID_GUTTER_MOBILE + 'px',
  '--grid-margin': GRID_MARGIN_MOBILE + 'px',
  [`@media (min-width: ${breakpoints.md}px) `]: {
    '--grid-gutter': GRID_GUTTER_DESKTOP + 'px',
    '--grid-margin': GRID_MARGIN_DESKTOP + 'px',
  },

  '--card-min-width': CARD_MIN_WIDTH + 'px',
  '--card-max-width': CARD_MAX_WIDTH + 'px',
  '--sidebar-width': SIDEBAR_WIDTH + 'px',
  '--content-max-width': CONTENT_MAX_WIDTH + 'px',

  '--card-columns': 1,
  [`@media (min-width: ${breakpoints.sm}px)`]: { '--card-columns': 2 },
  [`@media (min-width: ${breakpoints.md}px)`]: { '--card-columns': 3 },
  [`@media (min-width: ${breakpoints.lg}px)`]: { '--card-columns': 4 },
};

export default breakpoints;
