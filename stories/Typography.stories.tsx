import React from 'react';

import { useTheme, Typography } from '@material-ui/core';

export default {
  title: 'Typography',
  component: Typography,
  argTypes: {
    text: {
      defaultValue:
        'Antler is a global early-stage VC\nthat enables and invests in the defining\ncompanies of tomorrow.',
      control: { type: 'text' },
    },
    color: {
      defaultValue: 'initial',
      control: {
        type: 'radio',
        options: [
          'initial',
          'textPrimary',
          'textSecondary',
          'disabled',
          'primary',
          'secondary',
          'error',
        ],
      },
    },
  },
};

const TypographyPreview = (variant: string) => args => {
  const theme = useTheme();

  return (
    <Typography
      {...args}
      variant={variant}
      style={{
        color: args.color === 'disabled' ? theme.palette.text.disabled : '',
        whiteSpace: 'pre-line',
      }}
    >
      {args.text}
    </Typography>
  );
};

export const Heading1 = TypographyPreview('h1');
export const Heading2 = TypographyPreview('h2');
export const Heading3 = TypographyPreview('h3');
export const Heading4 = TypographyPreview('h4');
export const Heading5 = TypographyPreview('h5');
export const Heading6 = TypographyPreview('h6');
export const Subtitle1 = TypographyPreview('subtitle1');
export const Subtitle2 = TypographyPreview('subtitle2');
export const Body1 = TypographyPreview('body1');
export const Body2 = TypographyPreview('body2');
export const Button = TypographyPreview('button');
export const Overline = TypographyPreview('overline');
export const Caption = TypographyPreview('caption');
