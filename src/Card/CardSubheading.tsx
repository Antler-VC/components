import React from 'react';

import { useTheme, Typography, TypographyProps } from '@material-ui/core';

export default function CardSubheading(props: TypographyProps) {
  const theme = useTheme();

  return (
    <Typography
      variant="overline"
      component="h3"
      display="block"
      style={{ marginBottom: theme.spacing('xxs') }}
      {...(props as any)}
    />
  );
}
