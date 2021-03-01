import React from 'react';

import { useTheme, useMediaQuery, Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';

export default function CardTitle(props: TypographyProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Typography
      variant={isTablet ? 'h6' : 'h5'}
      component="h2"
      style={{
        whiteSpace: 'pre-line',
        wordBreak: 'break-word',
      }}
      {...(props as any)}
    />
  );
}
