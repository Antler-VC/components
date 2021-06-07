import { defaultTheme, generateTheme } from '../Theme/Theme';
import { getContrastRatio } from '@material-ui/core/styles';

export const generateStartupTheme = (color?: string) => {
  if (!color) return defaultTheme;

  const primary = defaultTheme.palette.augmentColor({ main: color });
  const primaryTextColor =
    getContrastRatio(defaultTheme.palette.background.default, primary.main) <
    4.5
      ? primary.dark
      : primary.main;

  return generateTheme({
    palette: { primary } as any,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: { color: primaryTextColor },
        },
      },
      MuiTypography: {
        colorPrimary: {
          color: primaryTextColor,
        },
      },
      MuiButton: {
        containedPrimary: {
          '&:hover': {
            backgroundColor:
              primary.contrastText.indexOf('0, 0, 0') > -1
                ? primary.dark
                : primary.light,
          },
        },
        outlinedPrimary: {
          color: primaryTextColor,
          'a&:hover': { color: primaryTextColor }, // antler.co fix
          '&:hover, &$focusVisible': { borderColor: primary.main },
        },
        textPrimary: {
          color: primaryTextColor,
          'a&:hover': { color: primaryTextColor }, // antler.co fix
        },
      },
    },
  });
};

export default generateStartupTheme;
