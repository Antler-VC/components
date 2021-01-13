export const antlerPalette = {
  aGray: {
    dark: '#595959',
    light: '#cccccc',
    regular: '#999999',
    superlight: '#f2f2f2',
  },
  amber: {
    dark: '#b38000',
    light: '#ffc107',
    regular: '#ffa000',
    superlight: '#ffd54f',
  },
  aRed: {
    dark: '#c12929',
    light: '#fb8c8c',
    regular: '#ed4747',
    superlight: '#fae4e5',
  },
  blue: {
    dark: '#0a59a8',
    light: '#2196f3',
    regular: '#1976d2',
    superlight: '#64b5f6',
  },
  blueGray: {
    dark: '#394c55',
    light: '#647c8a',
    regular: '#485a63',
    superlight: '#93a4ad',
  },
  brown: {
    dark: '#4e3229',
    light: '#795548',
    regular: '#5d4037',
    superlight: '#a1887f',
  },
  cyan: {
    dark: '#258493',
    light: '#00bcd4',
    regular: '#0097a7',
    superlight: '#4dd0e1',
  },
  errorRed: {
    dark: '#c62323',
    light: '#f44336',
    regular: '#d32f2f',
    superlight: '#e57373',
  },
  gray: {
    dark: '#595959',
    light: '#cccccc',
    regular: '#999999',
    superlight: '#f2f2f2',
  },
  green: {
    dark: '#2E7D32',
    light: '#4CAF50',
    regular: '#388E3C',
    superlight: '#81C784',
  },
  indigo: {
    dark: '#213092',
    light: '#3f51b5',
    regular: '#303f9f',
    superlight: '#7986cb',
  },
  lightBlue: {
    dark: '#007fc5',
    light: '#03a9f4',
    regular: '#0b8ed6',
    superlight: '#4fc3f7',
  },
  lightGreen: {
    dark: '#4f6f33',
    light: '#8bc34a',
    regular: '#689f38',
    superlight: '#aed581',
  },
  lime: {
    dark: '#8e9d01',
    light: '#cddc39',
    regular: '#afb42b',
    superlight: '#dce775',
  },
  orange: {
    dark: '#bb661e',
    light: '#ff9800',
    regular: '#f57c00',
    superlight: '#ffb74d',
  },
  pink: {
    dark: '#b0104f',
    light: '#e91e63',
    regular: '#c2185b',
    superlight: '#f06292',
  },
  purple: {
    dark: '#650e89',
    light: '#9c27b0',
    regular: '#7b1fa2',
    superlight: '#ba68c8',
  },
  tangerine: {
    dark: '#c0360a',
    light: '#ff5722',
    regular: '#e64a19',
    superlight: '#ff8a65',
  },
  teal: {
    dark: '#00796b',
    light: '#009688',
    regular: '#00796b',
    superlight: '#4db6ac',
  },
  violet: {
    dark: '#3f1c94',
    light: '#673ab7',
    regular: '#512da8',
    superlight: '#9575cd',
  },
  yellow: {
    dark: '#D07E04',
    light: '#FFEB3B',
    regular: '#FBC02D',
    superlight: '#FFF176',
  },
  aBlack: '#282829',
  aWhite: '#ffffff',
} as const;

export const antlerPaletteToMui = (
  color: Record<'dark' | 'light' | 'regular' | 'superlight', string>
) => ({
  main: color.regular,
  light: color.light,
  dark: color.dark,
});

export default antlerPalette;
