import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';

export const HEADING_TEXT = 'Europa, sans-serif';
export const BODY_TEXT = '"Open Sans", sans-serif';
export const ANTLER_RED = '#ef4747';
export const ANTLER_RED_ACCESSIBLE = '#e22729';

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    primary: { main: ANTLER_RED_ACCESSIBLE, light: ANTLER_RED },
    secondary: { main: '#282829' },
    text: { secondary: 'rgba(0, 0, 0, 0.6)' },
  },
  typography: {
    fontFamily: BODY_TEXT,
    h3: {
      fontFamily: HEADING_TEXT,
      fontSize: '2.25rem',
      fontWeight: 'bold',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h4: {
      fontFamily: HEADING_TEXT,
      fontWeight: 'normal',
      fontSize: '1.5rem',
      lineHeight: 1.33,
    },
    h5: {
      fontFamily: HEADING_TEXT,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.125em',
      textTransform: 'uppercase',

      '@media (max-width: 640px)': { fontSize: '1.25rem' },
    },
    h6: {
      fontFamily: HEADING_TEXT,
      fontSize: '1.125rem',
      fontWeight: 'normal',
      letterSpacing: 0.2,
    },
    overline: {
      fontFamily: HEADING_TEXT,
      fontSize: '0.8125rem',
      fontWeight: 'bold',
      fontStyle: 'normal',
      lineHeight: 1.2,
      letterSpacing: 2,
      color: 'rgba(0, 0, 0, 0.6)',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: 0.15,
    },
    body1: {
      lineHeight: 1.75,
      letterSpacing: '0.0125em',
      maxWidth: '32em',
    },
    subtitle2: {
      fontFamily: HEADING_TEXT,
      fontWeight: 'bold',
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 13.8,
      fontWeight: 'normal',
      lineHeight: 1.45,
      letterSpacing: 0.25,
    },
    button: {
      fontFamily: HEADING_TEXT,
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: 1,
      letterSpacing: 0.75,
    },
    caption: {
      fontFamily: HEADING_TEXT,
      fontSize: '0.8125rem',
      fontWeight: 'bold',
      letterSpacing: 0.4,
      lineHeight: 1.2,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 64,
      '@media (min-width: 0px) and (orientation: landscape)': { minHeight: 56 },
      '@media (min-width:768px)': { minHeight: 80 },
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        '@supports (padding: max(0px))': {
          paddingLeft: 'max(16px, env(safe-area-inset-left))',
          paddingRight: 'max(16px, env(safe-area-inset-right))',

          '@media (min-width: 640px)': {
            paddingLeft: 'max(24px, env(safe-area-inset-left))',
            paddingRight: 'max(24px, env(safe-area-inset-right))',
          },
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontFamily: HEADING_TEXT,
        fontSize: '0.8125rem',
        fontWeight: 'bold',
        letterSpacing: 0.4,
        lineHeight: 1.2,
      },
    },
    MuiTab: {
      root: { fontSize: '1rem !important' },
    },
    MuiButton: {
      root: { minHeight: 36 },

      contained: {
        borderRadius: 500,
        boxShadow: 'none',
      },
      containedSizeLarge: {
        padding: '8px 40px',
        minHeight: 48,
      },
      containedPrimary: {
        backgroundColor: ANTLER_RED,
        '&:hover': { backgroundColor: ANTLER_RED },
      },

      outlinedPrimary: { borderColor: 'rgba(0, 0, 0, 0.23)' },
      outlinedSizeLarge: {
        padding: '8px 32px',
        minHeight: 48,
        borderRadius: 500,

        '&$outlinedPrimary': { borderColor: ANTLER_RED_ACCESSIBLE },
      },
    },
    MuiSvgIcon: {
      fontSizeLarge: { fontSize: '2rem' },
    },
    MuiFormLabel: {
      root: {
        fontFamily: HEADING_TEXT,
        fontSize: '1rem',
        fontWeight: 'bold',
        letterSpacing: 0.4,
      },
    },
    MuiFormControlLabel: {
      root: { display: 'flex' },
      label: {
        fontSize: 13.8,
        fontWeight: 'normal',
        lineHeight: 1.45,
        letterSpacing: 0.25,
      },
    },
  },
  props: {
    MuiRadio: { color: 'primary' },
    MuiCheckbox: { color: 'primary' },
    MuiCircularProgress: { size: 44 },
    // Select: show dropdown below text field to follow new Material spec
    MuiSelect: {
      MenuProps: {
        getContentAnchorEl: null,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      },
    },
    MuiChip: { size: 'small' },
  },
};

export const defaultTheme = createMuiTheme(defaultThemeOptions);
