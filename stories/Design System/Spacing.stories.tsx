import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core';
import spacing from '../../src/Theme/spacing';
import antlerPalette from '../../src/Theme/antlerPalette';

export default {
  title: 'Antler Theme/Design System/Spacing',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const useStyles = makeStyles(theme =>
  createStyles({
    table: {
      color: theme.palette.text.secondary,
      borderSpacing: '32px',

      '& thead th': {
        ...theme.typography.button,
        color: theme.palette.text.primary,
      },
      '& tbody th': {
        ...theme.typography.body2,
        fontWeight: 600,
        textAlign: 'left',
      },
    },
  })
);

const Box = ({ size }: { size: number }) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundColor: antlerPalette.cyan[500],
    }}
  />
);

export const Spacing = () => {
  const classes = useStyles();

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(spacing).map(([name, value]) => (
          <tr key={name}>
            <th scope="row">{name}</th>
            <td>
              <Box size={value} />
            </td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
