import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Grid,
  GridProps,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: 0,
      listStyleType: 'none',
    },

    employerLogo: ({ size }: { size: number }) => ({
      width: size,
      height: size,
      backgroundSize: 'contain',
    }),
  })
);

export interface IEmployerLogosProps {
  employerLogos: { downloadURL: string }[];
  className?: string;
  size?: number;
  spacing?: GridProps['spacing'];
}

export default function EmployerLogos({
  employerLogos,
  className,
  size = 40,
  spacing = 1,
}: IEmployerLogosProps) {
  const classes = useStyles({ size });

  return (
    <Grid
      container
      component="ul"
      wrap="wrap-reverse"
      spacing={spacing}
      className={clsx(classes.root, className)}
    >
      {employerLogos.map((logo, i) => (
        <Grid item component="li" key={i}>
          <CardMedia
            className={classes.employerLogo}
            image={logo.downloadURL}
          />
        </Grid>
      ))}
    </Grid>
  );
}
