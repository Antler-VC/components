import React from 'react';

import { useTheme, Typography, TypographyProps } from '@material-ui/core';
import { spacingFn } from 'Theme/spacing';

export default function CardSubheading(props: TypographyProps) {
  const theme = useTheme();

  return (
    <Typography
      variant="overline"
      component="h3"
      display="block"
      style={{ marginBottom: spacingFn('xxs') }}
      {...(props as any)}
    />
  );
}
