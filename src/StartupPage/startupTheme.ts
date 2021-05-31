import { defaultTheme, generateTheme } from '../Theme/Theme';
import { getContrastRatio } from '@material-ui/core/styles';

export const generateStartupTheme = (color?: string) => {
  if (!color) return defaultTheme;

  const primary = defaultTheme.palette.augmentColor({ main: color });

  return generateTheme({
    palette: { primary } as any,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: { color: primary.main },
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
          color:
            getContrastRatio(
              defaultTheme.palette.background.default,
              primary.main
            ) < 4.5
              ? primary.dark
              : primary.main,
          '&:hover, &$focusVisible': { borderColor: primary.main },
        },
        textPrimary: {
          color:
            getContrastRatio(
              defaultTheme.palette.background.default,
              primary.main
            ) < 4.5
              ? primary.dark
              : primary.main,
        },
      },
    },
  });
};

export default generateStartupTheme;
