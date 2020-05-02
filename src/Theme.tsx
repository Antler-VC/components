import React from 'react';
import _merge from 'lodash/merge';

import { createMuiTheme, ThemeOptions, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

export const HEADING_FONT = 'Europa, sans-serif';
export const BODY_FONT = '"Open Sans", sans-serif';

export const ANTLER_RED = '#ef4747';
export const ANTLER_RED_ACCESSIBLE = '#e22729';
export const SECONDARY_GREY = '#282829';
export const SECONDARY_TEXT = 'rgba(0, 0, 0, 0.6)';
export const ERROR = '#b00020';

export const ROOT_FONT_SIZE = 16;
export const toRem = (px: number) => `${px / ROOT_FONT_SIZE}rem`;
export const toEm = (px: number, root: number) => `${px / root}em`;

export const themeBase = createMuiTheme({
  palette: {
    primary: { main: ANTLER_RED, light: ANTLER_RED },
    secondary: { main: SECONDARY_GREY },
    text: { secondary: SECONDARY_TEXT },
    error: { main: ERROR },
  },
  typography: {
    fontFamily: BODY_FONT,
    h1: { fontFamily: HEADING_FONT },
    h2: { fontFamily: HEADING_FONT },
    h3: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(36),
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(32),
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(24),
      fontWeight: 'bold',
    },
    h6: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(18),
      fontWeight: 'bold',
    },
    subtitle1: {
      lineHeight: 1.5,
    },
    subtitle2: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(16),
      fontWeight: 'bold',
      letterSpacing: toEm(0.4, 16),
      lineHeight: 1.5,
    },
    body1: {
      letterSpacing: toEm(0.5, 16),
      lineHeight: 1.75,
    },
    body2: {
      fontSize: toRem(14),
      letterSpacing: toEm(0.25, 14),
    },
    button: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(16),
      fontWeight: 'bold',
      letterSpacing: toEm(0.75, 16),
      lineHeight: 1,
    },
    caption: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(13),
      fontWeight: 'bold',
      letterSpacing: toEm(0.4, 13),
      lineHeight: 16 / 13,
    },
    overline: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(13),
      fontWeight: 'bold',
      letterSpacing: toEm(2, 13),
      lineHeight: 16 / 13,
      color: SECONDARY_TEXT,
    },
  },
});

export const defaultOverrides: ThemeOptions = {
  overrides: {
    MuiContainer: {
      root: {
        '@supports (padding: max(0px))': {
          paddingLeft: `max(${themeBase.spacing(
            2
          )}px, env(safe-area-inset-left))`,
          paddingRight: `max(${themeBase.spacing(
            2
          )}px, env(safe-area-inset-right))`,

          '@media (min-width: 640px)': {
            paddingLeft: `max(${themeBase.spacing(
              3
            )}px, env(safe-area-inset-left))`,
            paddingRight: `max(${themeBase.spacing(
              3
            )}px, env(safe-area-inset-right))`,
          },
        },
      },
    },
    MuiTooltip: {
      tooltip: themeBase.typography.caption,
    },
    MuiButton: {
      root: { minHeight: 36 },
      sizeSmall: { minHeight: 30 },
      sizeLarge: { minHeight: 48 },

      contained: {
        borderRadius: 500,
        boxShadow: 'none',
      },
      containedSizeLarge: {
        padding: themeBase.spacing(1, 4),
      },

      outlinedPrimary: {
        // Same as outlined text field
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      outlinedSizeLarge: {
        padding: themeBase.spacing(1, 4),
        borderRadius: 500,

        '&$outlinedPrimary': { borderColor: ANTLER_RED },
      },
    },
    MuiSvgIcon: {
      fontSizeLarge: { fontSize: toRem(36) },
    },
    // Override text field label
    MuiFormLabel: {
      root: {
        ...themeBase.typography.subtitle2,
        lineHeight: 1,
      },
    },
    // Override radio & checkbox labels
    MuiFormControlLabel: {
      root: { display: 'flex' },
      label: themeBase.typography.body2,
    },
    MuiChip: {
      root: {
        borderRadius: 4,
        maxWidth: '100%',

        height: 'auto',
        minHeight: 32,

        color: themeBase.palette.text.secondary,
      },
      label: {
        ...themeBase.typography.overline,
        color: 'inherit',
        padding: themeBase.spacing(1, 1.5),
        paddingRight: themeBase.spacing(1.25),
        whiteSpace: 'normal',

        '$outlined &': {
          paddingTop: themeBase.spacing(0.875),
          paddingBottom: themeBase.spacing(0.875),
        },
      },
      sizeSmall: { minHeight: 24 },
      labelSmall: { padding: themeBase.spacing(0.5, 1.5) },

      outlined: {
        backgroundColor: themeBase.palette.action.selected,
        borderColor: themeBase.palette.action.selected,
      },
      outlinedPrimary: {
        backgroundColor: fade(
          ANTLER_RED,
          themeBase.palette.action.selectedOpacity
        ),
      },
    },
    MuiBadge: {
      badge: {
        ...themeBase.typography.caption,
        fontFeatureSettings: '"tnum"',
      },
    },
    MuiPaper: {
      rounded: { borderRadius: 8 },
    },
    MuiSlider: {
      disabled: {},
      rail: {
        backgroundColor: '#e7e7e7',
        opacity: 1,
      },

      mark: {
        width: 4,
        height: 4,
        borderRadius: '50%',
        marginLeft: -2,
        marginTop: -1,
        backgroundColor: '#69696a',
        '$disabled &': { backgroundColor: 'currentColor' },
      },
      markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
        '$disabled &': { backgroundColor: 'currentColor' },
      },

      thumb: {
        width: 16,
        height: 16,
        marginTop: -7,
        marginLeft: -8,

        '$disabled &': {
          width: 12,
          height: 12,
          marginTop: -5,
          marginLeft: -6,
        },
      },

      valueLabel: {
        top: -22,
        ...themeBase.typography.caption,
        color: themeBase.palette.primary.main,

        '& > *': {
          width: 'auto',
          minWidth: 24,
          height: 24,

          whiteSpace: 'nowrap',
          borderRadius: 500,

          padding: themeBase.spacing(0, 1),
          paddingRight: themeBase.spacing(0.875),
        },
        '& *': { transform: 'none' },
      },
      markLabel: themeBase.typography.caption,
    },
    MuiLinearProgress: {
      colorPrimary: { backgroundColor: '#e7e7e7' },
      colorSecondary: { backgroundColor: '#e7e7e7' },
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        subtitle1: 'div',
        subtitle2: 'div',
      },
    },
    MuiRadio: { color: 'primary' },
    MuiCheckbox: { color: 'primary' },
    MuiButton: { color: 'primary' },
    MuiTabs: {
      indicatorColor: 'primary',
      textColor: 'primary',
    },
    MuiCircularProgress: { size: 44 },
    // Select: show dropdown below text field to follow new Material spec
    MuiSelect: {
      MenuProps: {
        getContentAnchorEl: null,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      },
    },
    MuiLink: {
      color: 'primary',
      underline: 'hover',
    },
    MuiChip: { deleteIcon: <ClearIcon /> },
  },
};

export const defaultTheme = createMuiTheme(_merge(themeBase, defaultOverrides));

export const generateTheme = (options: ThemeOptions, ...args: Object[]) =>
  createMuiTheme(_merge(themeBase, defaultOverrides, options), ...args);

export default defaultTheme;
