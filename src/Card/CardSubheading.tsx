import React from 'react';

import { Typography, TypographyProps } from '@material-ui/core';
import { spacingFn } from '../Theme/spacing';

export default function CardSubheading(props: TypographyProps) {
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
