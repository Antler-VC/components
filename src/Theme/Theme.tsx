import React from 'react';
import _merge from 'lodash/merge';

import { createMuiTheme, ThemeOptions, fade } from '@material-ui/core/styles';
import { Shadows } from '@material-ui/core/styles/shadows';

import ClearIcon from '@material-ui/icons/Clear';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxIcon from '@material-ui/icons/CheckBoxSharp';

import { antlerPalette, antlerPaletteToMui } from './antlerPalette';
import { spacingFn } from './spacing';
import { BREAKPOINT_VALUES, LAYOUT_CSS_VARS } from './layout';

export const HEADING_FONT = 'Europa, sans-serif';
export const BODY_FONT = '"Open Sans", sans-serif';
export const MONO_FONT =
  'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace';

export const PRIMARY_TEXT = antlerPalette.aBlack[500];
export const SECONDARY_TEXT = antlerPalette.aGray[700];
export const DISABLED_TEXT = antlerPalette.aGray[500];

export const ROOT_FONT_SIZE = 16;
export const toRem = (px: number) => `${px / ROOT_FONT_SIZE}rem`;
export const toEm = (px: number, root: number) => `${px / root}em`;

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    antler: typeof antlerPalette;
  }
  interface PaletteOptions {
    antler: typeof antlerPalette;
  }
}
declare module '@material-ui/core/styles/createTypography' {
  interface FontStyle {
    fontFamilyMono: string;
  }
}
declare module '@material-ui/core/styles/createSpacing' {
  interface Spacing {
    (value: string | number): number;
  }
}

export const themeBase = createMuiTheme({
  palette: {
    primary: antlerPaletteToMui(antlerPalette.aRed),
    secondary: { main: antlerPalette.aBlack[500] },
    background: {
      default: antlerPalette.aGray[50],
      paper: antlerPalette.aWhite[500],
    },
    text: {
      primary: PRIMARY_TEXT,
      secondary: SECONDARY_TEXT,
      disabled: DISABLED_TEXT,
    },
    error: antlerPaletteToMui(antlerPalette.errorRed),
    warning: antlerPaletteToMui(antlerPalette.amber),
    info: antlerPaletteToMui(antlerPalette.blue),
    success: antlerPaletteToMui(antlerPalette.green),
    antler: antlerPalette,

    action: {
      hover: 'rgba(0, 0, 0, 0.12)',
      hoverOpacity: 0.12,
    },
  },
  // Single shadow for all levels
  shadows: ['none'].concat(
    new Array(24).fill(
      `0 1px 1px 0 rgba(0, 0, 0, 0.04),
       0 0 4px 0 rgba(0, 0, 0, 0.04),
       0 6px 8px 0 rgba(0, 0, 0, 0.04),
       0 8px 16px 0 rgba(0, 0, 0, 0.04)`
    )
  ) as Shadows,
  typography: {
    fontFamily: BODY_FONT,
    fontFamilyMono: MONO_FONT,
    h1: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(48),
      fontWeight: 'normal',
      letterSpacing: toEm(-0.67, 48),
      lineHeight: 64 / 48,
    },
    h2: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(40),
      fontWeight: 'normal',
      letterSpacing: toEm(-0.34, 40),
      lineHeight: 56 / 40,
    },
    h3: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(36),
      fontWeight: 'normal',
      letterSpacing: toEm(0, 36),
      lineHeight: 48 / 36,
    },
    h4: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(32),
      fontWeight: 'normal',
      letterSpacing: toEm(0.21, 32),
      lineHeight: 40 / 32,
    },
    h5: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(24),
      fontWeight: 'normal',
      letterSpacing: toEm(0, 24),
      lineHeight: 32 / 24,
    },
    h6: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(18),
      fontWeight: 'normal',
      letterSpacing: toEm(0.2, 18),
      lineHeight: 24 / 16,
    },
    subtitle1: {
      fontSize: toRem(16),
      letterSpacing: toEm(0.15, 16),
      lineHeight: 24 / 16,
    },
    subtitle2: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(16),
      fontWeight: 'bold',
      letterSpacing: toEm(0.1, 16),
      lineHeight: 24 / 16,
    },
    body1: {
      fontSize: toRem(16),
      letterSpacing: toEm(0.5, 16),
      lineHeight: 24 / 16,
      color: SECONDARY_TEXT,
    },
    body2: {
      fontSize: toRem(14),
      letterSpacing: toEm(0.25, 14),
      lineHeight: 24 / 14,
      color: SECONDARY_TEXT,
    },
    button: {
      fontSize: toRem(14),
      fontWeight: 600,
      letterSpacing: toEm(0.67, 14),
      lineHeight: 16 / 14,
    },
    overline: {
      fontSize: toRem(14),
      letterSpacing: toEm(2.5, 14),
      lineHeight: 16 / 14,
      color: DISABLED_TEXT,
    },
    caption: {
      fontSize: toRem(14),
      letterSpacing: toEm(0.5, 14),
      lineHeight: 16 / 14,
    },
  },
  breakpoints: { values: BREAKPOINT_VALUES },
  mixins: {
    toolbar: {
      minHeight: 56,

      [`@media (min-width: ${BREAKPOINT_VALUES.md}px)`]: {
        minHeight: 64,
      },
    },
  },
});

export const defaultOverrides: ThemeOptions = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        ':root': LAYOUT_CSS_VARS,
        body: { color: themeBase.palette.text.primary },

        '.MultiSelect-Paper.MultiSelect-Paper': {
          boxShadow: `0 0 0 1px ${themeBase.palette.divider}`,
          borderRadius: 0,
        },
      },
    },

    MuiContainer: {
      root: {
        paddingLeft: 'var(--grid-margin)',
        paddingRight: 'var(--grid-margin)',

        maxWidth: 'var(--grid-max-width)',

        '@supports (padding: max(0px))': {
          paddingLeft: 'max(var(--grid-margin), env(safe-area-inset-left))',
          paddingRight: 'max(var(--grid-margin), env(safe-area-inset-right))',
        },
      },
      maxWidthXl: {
        maxWidth: 'var(--grid-max-width)',
        [themeBase.breakpoints.up('xl')]: {
          maxWidth: 'var(--content-max-width)',
        },
      },
    },
    MuiTooltip: {
      tooltip: themeBase.typography.caption,
    },

    MuiButton: {
      root: {
        borderRadius: 500,
        minHeight: 36,
      },

      containedSizeLarge: {
        fontSize: themeBase.typography.button.fontSize,
        minHeight: 48,
        paddingLeft: 32,
        paddingRight: 32,
      },
      outlinedSizeLarge: {
        fontSize: themeBase.typography.button.fontSize,
        minHeight: 48,
        paddingLeft: 31,
        paddingRight: 31,
      },
      textSizeLarge: {
        fontSize: themeBase.typography.button.fontSize,
        minHeight: 48,
        paddingLeft: 16,
        paddingRight: 16,
      },

      containedSizeSmall: { minHeight: 30 },
      outlinedSizeSmall: { minHeight: 30 },
      textSizeSmall: { minHeight: 30 },

      containedPrimary: {
        '&:hover': { backgroundColor: themeBase.palette.primary.light },
      },
      containedSecondary: {
        '&:hover': { backgroundColor: antlerPalette.aGray[700] },
      },

      outlinedPrimary: {
        borderColor: 'rgba(0, 0, 0, 0.23)',
        '&:hover, &$focusVisible': {
          borderColor: themeBase.palette.primary.main,
        },
      },
      outlinedSecondary: {
        borderColor: 'rgba(0, 0, 0, 0.23)',
        '&:hover, &$focusVisible': {
          borderColor: themeBase.palette.secondary.main,
        },
      },
    },

    MuiIconButton: {
      edgeEnd: {
        '& + &': { marginLeft: 12 },
      },
      edgeStart: {
        '& + &': { marginRight: 12 },
      },
    },

    MuiSvgIcon: {
      fontSizeLarge: { fontSize: toRem(36) },
    },

    MuiFilledInput: {
      root: {
        '&&': { borderRadius: 0 },
        backgroundColor: antlerPalette.aGray[100],
        boxShadow: `0 0 0 1px ${antlerPalette.aGray[300]} inset`,

        transition: themeBase.transitions.create(
          ['background-color', 'box-shadow'],
          {
            duration: themeBase.transitions.duration.shorter,
            easing: themeBase.transitions.easing.easeOut,
          }
        ),

        '&:hover': {
          backgroundColor: antlerPalette.aGray[100],
          boxShadow: `0 0 0 1px ${antlerPalette.aGray[700]} inset`,
        },
        '&$focused': {
          backgroundColor: antlerPalette.aGray[200],
          boxShadow: `0 0 0 1px ${antlerPalette.aGray[700]} inset`,
        },

        '&$error': {
          boxShadow: `0 0 0 2px ${antlerPalette.errorRed[100]} inset`,
          '& button': { color: themeBase.palette.error.main },
        },
        '&$error:hover, &$error$focused': {
          boxShadow: `0 0 0 2px ${antlerPalette.errorRed[500]} inset`,
        },

        '&$disabled, &$disabled$error': {
          backgroundColor: antlerPalette.aWhite[500],
          boxShadow: `0 0 0 1px rgba(25, 25, 25, 0.32) inset`,
          '& button': { color: themeBase.palette.action.disabled },
        },
      },
      input: { padding: '27px 16px 10px' },
      multiline: { padding: '27px 16px 10px' },
      adornedEnd: {
        '& button': { marginRight: spacingFn(-1) },
      },
    },
    MuiInputLabel: {
      filled: {
        color: themeBase.palette.text.primary,

        lineHeight: 1.2,
        transform: 'translate(16px, 19px) scale(1)',
        '&$marginDense': { transform: 'translate(16px, 19px) scale(1)' },

        maxWidth: 'calc(100% - 16px - 48px)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',

        '&$shrink': {
          transform: 'translate(16px, 9.5px) scale(0.875)',
          '&$marginDense': { transform: 'translate(16px, 9.5px) scale(0.875)' },
          maxWidth: 'calc(100% - 24px)',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: themeBase.palette.text.primary,
        '&$focused': { color: themeBase.palette.text.primary },
        '&$disabled, &$disabled$error': {
          color: themeBase.palette.text.disabled,
        },
      },
    },
    MuiInputBase: {
      root: { color: themeBase.palette.text.secondary },
    },
    MuiSelect: {
      iconFilled: { right: 12 },
    },
    MuiFormHelperText: {
      root: {
        color: themeBase.palette.text.primary,

        '&$disabled, &$disabled$error': {
          color: themeBase.palette.text.disabled,
        },
      },
      contained: {
        marginLeft: spacingFn(2),
        marginRight: spacingFn(2),
      },
    },

    // Override radio & checkbox labels
    MuiFormControlLabel: {
      root: { display: 'flex' },
      label: themeBase.typography.body2,
    },

    MuiChip: {
      root: {
        backgroundColor: antlerPalette.aGray[200],
        color: themeBase.palette.text.secondary,
        height: 'auto',
        borderRadius: 20,
      },
      outlined: { borderColor: themeBase.palette.divider },
      sizeSmall: { height: 'auto' },

      label: {
        ...themeBase.typography.overline,
        color: 'inherit',
        overflow: 'visible',
        whiteSpace: 'normal',

        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 24,
        paddingRight: 24,
        '$outlined &': {
          paddingTop: 7,
          paddingBottom: 7,
          paddingLeft: 23,
          paddingRight: 23,
        },

        [themeBase.breakpoints.down('xs')]: {
          paddingLeft: 16,
          paddingRight: 16,
          '$outlined &': {
            paddingLeft: 15,
            paddingRight: 15,
          },
        },
      },
      labelSmall: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 24,
        paddingRight: 24,
        '$outlined &': {
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: 23,
          paddingRight: 23,
        },

        [themeBase.breakpoints.down('xs')]: {
          paddingLeft: 16,
          paddingRight: 16,
          '$outlined &': {
            paddingLeft: 15,
            paddingRight: 15,
          },
        },
      },

      icon: {
        color: 'inherit',

        marginLeft: 16,
        marginRight: 8 - 24,
        '$outlined &': {
          marginLeft: 15,
          marginRight: 8 - 24 + 1,
        },

        [themeBase.breakpoints.down('xs')]: {
          marginLeft: 8,
          marginRight: 8 - 16,
          '$outlined &': {
            marginLeft: 7,
            marginRight: 8 - 16 + 1,
          },
        },
      },
      iconSmall: {
        marginLeft: 16,
        marginRight: 8 - 24,
        '$outlined &': {
          marginLeft: 15,
          marginRight: 8 - 24 + 1,
        },

        [themeBase.breakpoints.down('xs')]: {
          marginLeft: 8,
          marginRight: 8 - 16,
          '$outlined &': {
            marginLeft: 7,
            marginRight: 8 - 16 + 1,
          },
        },
      },

      deleteIcon: {
        color: 'inherit',

        marginRight: 16,
        marginLeft: 8 - 24,
        '$outlined &': {
          marginRight: 15,
          marginLeft: 8 - 24 + 1,
        },

        [themeBase.breakpoints.down('xs')]: {
          marginRight: 8,
          marginLeft: 8 - 16,
          '$outlined &': {
            marginRight: 7,
            marginLeft: 8 - 16 + 1,
          },
        },
      },
      deleteIconSmall: {
        marginRight: 16,
        marginLeft: 8 - 24,
        '$outlined &': {
          marginRight: 15,
          marginLeft: 8 - 24 + 1,
        },

        [themeBase.breakpoints.down('xs')]: {
          marginRight: 8,
          marginLeft: 8 - 16,
          '$outlined &': {
            marginRight: 7,
            marginLeft: 8 - 16 + 1,
          },
        },
      },
      deleteIconColorPrimary: { color: 'inherit' },
      deleteIconColorSecondary: { color: 'inherit' },
      deleteIconOutlinedColorPrimary: { color: 'inherit' },
      deleteIconOutlinedColorSecondary: { color: 'inherit' },

      clickable: {
        '&:active': { boxShadow: 'none' },
      },
    },

    MuiBadge: {
      badge: {
        ...themeBase.typography.caption,
        fontFeatureSettings: '"tnum"',
      },
    },

    MuiPaper: {
      rounded: { borderRadius: themeBase.shape.borderRadius * 2 },
      // Default elevation - show shadow only on hover
      elevation1: {
        transition: themeBase.transitions.create('box-shadow'),
        boxShadow: 'none',
        '&:hover': { boxShadow: themeBase.shadows[1] },
      },
    },

    MuiSlider: {
      // disabled: {},
      rail: {
        backgroundColor: antlerPalette.aGray[200],
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
        '& *': { transform: 'none' },

        top: -22,
        left: 'auto',
        right: 'auto',
        color: 'inherit',

        '& > *': {
          width: 'auto',
          minWidth: 24,
          height: 24,
          borderRadius: 500,

          paddingLeft: 6,
          paddingRight: `calc(6px - ${themeBase.typography.caption.letterSpacing})`,

          ...themeBase.typography.caption,
          whiteSpace: 'nowrap',
        },
      },
      markLabel: themeBase.typography.overline,
    },
    MuiLinearProgress: {
      colorPrimary: { backgroundColor: '#e7e7e7' },
      colorSecondary: { backgroundColor: '#e7e7e7' },
    },
    MuiSwitch: {
      root: { overflow: 'visible' },

      checked: {},
      switchBase: {
        '$checked:not($disabled)&': {
          color: antlerPalette.green[700],

          '&:hover': { backgroundColor: fade(antlerPalette.green[700], 0.12) },
        },
      },

      track: {
        backgroundColor: antlerPalette.gray[700],

        '$switchBase$checked:not($disabled) + &': {
          backgroundColor: antlerPalette.green[300],
          opacity: 0.38,
        },
      },

      thumb: {
        boxShadow: '0 4px 8px 4px rgba(0, 0, 0, 0.1)',
      },
    },

    MuiTableContainer: {
      root: {
        padding: spacingFn(0, 's'),
        [themeBase.breakpoints.down('sm')]: {
          padding: spacingFn(0, 'xs'),
        },

        '.sticky &, &.sticky': { paddingRight: 0 },
      },
    },
    MuiTable: {
      root: {
        tableLayout: 'fixed',
        boxSizing: 'content-box',
      },
    },
    MuiTableCell: {
      root: {
        padding: spacingFn('xs'),

        '&:first-child': { paddingLeft: 0 },
        '&:last-child': { paddingRight: 0 },

        '.sticky &:last-child': {
          paddingRight: spacingFn('xs'),

          position: 'sticky',
          right: 0,

          background: themeBase.palette.background.paper,
          boxShadow: '0 4px 8px 4px rgba(0, 0, 0, 0.1)',
          clipPath: 'polygon(-12px 0%, 100% 0%, 100% 100%, -12px 100%)',
        },
      },

      head: {
        ...themeBase.typography.overline,
        color: themeBase.palette.text.secondary,

        padding: spacingFn('s', 'xs'),
      },
    },
    MuiTablePagination: {
      caption: {
        ...themeBase.typography.overline,
        color: themeBase.palette.text.secondary,
      },

      select: {
        ...themeBase.typography.overline,
        color: themeBase.palette.primary.main,
      },
      selectIcon: {
        color: themeBase.palette.primary.main,
      },
    },
  },
  props: {
    MuiContainer: { maxWidth: 'xl' },
    MuiTypography: {
      variantMapping: {
        subtitle1: 'div',
        subtitle2: 'div',
      },
    },
    MuiRadio: { color: 'default' },
    MuiCheckbox: {
      color: 'default',
      icon: <CheckBoxOutlineBlankIcon />,
      checkedIcon: <CheckBoxIcon />,
    },
    MuiSwitch: { color: 'default' },
    MuiButton: {
      color: 'primary',
      disableElevation: true,
    },
    MuiTabs: {
      indicatorColor: 'primary',
      textColor: 'primary',
    },

    MuiCircularProgress: {
      size: 48,
      thickness: 1.6,
    },

    // Select: show dropdown below text field to follow new Material spec
    MuiSelect: {
      MenuProps: {
        getContentAnchorEl: null,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
        PaperProps: { variant: 'outlined' },
      },
    },
    MuiLink: {
      color: 'primary',
      underline: 'hover',
    },
    MuiChip: {
      size: 'small',
      deleteIcon: <ClearIcon />,
    },
    MuiTextField: { variant: 'filled' },
    MuiTooltip: { enterTouchDelay: 0 },
    MuiFilledInput: { disableUnderline: true },
    MuiPaper: { square: true },
    MuiSlider: { valueLabelDisplay: 'on' },
  },
};

export const defaultTheme = {
  ...createMuiTheme(_merge({}, themeBase, defaultOverrides)),
  spacing: spacingFn,
};

export const generateTheme = (options: ThemeOptions, ...args: Object[]) => ({
  ...createMuiTheme(_merge({}, themeBase, defaultOverrides, options), ...args),
  spacing: spacingFn,
});

export default defaultTheme;
