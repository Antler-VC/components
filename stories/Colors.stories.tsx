import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/core';
import antlerPalette from '../src/Theme/antlerPalette';

export default {
  title: 'Antler Theme/Design System/Colors',
};

const SWATCH_SIZE = 96;
const SHADES = [100, 300, 500, 700, 50, 200, 600];

const useStyles = makeStyles(theme =>
  createStyles({
    table: {
      borderCollapse: 'collapse',
      borderSpacing: 0,

      '& th': {
        ...theme.typography.body2,
        position: 'sticky',

        backgroundColor: 'rgba(250, 250, 250, 0.8)',
      },

      margin: '0 auto',
    },

    shadeName: {
      paddingTop: 16,
      paddingBottom: 8,
      top: 0,

      'th&': theme.typography.button,
    },

    colorName: {
      textTransform: 'capitalize',
      paddingLeft: 16,
      paddingRight: 16,
      left: 0,
    },

    color: {
      borderRadius: theme.shape.borderRadius * 2,
      width: SWATCH_SIZE,
      height: SWATCH_SIZE,
      margin: 16,

      transition: theme.transitions.create('box-shadow', {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': { boxShadow: theme.shadows[1] },

      display: 'grid',
      placeItems: 'center',

      userSelect: 'all',
    },
    colorWide: { width: SWATCH_SIZE * 2 },
    colorBordered: { border: `1px solid ${theme.palette.divider}` },

    colorValue: {
      backgroundColor: 'rgba(0, 0, 0, 0.33)',
      color: '#fff',

      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0, 1),

      opacity: 0,
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.short,
      }),
      '$color:hover &, $color:active &': { opacity: 1 },
    },
  })
);

const Color = ({ value, wide }: { value: string; wide?: boolean }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.color,
        wide && classes.colorWide,
        (value === '#ffffff' || value === '#fafafa' || value === '#f2f2f2') &&
          classes.colorBordered
      )}
      style={{ backgroundColor: value }}
    >
      <span className={classes.colorValue}>{value}</span>
    </div>
  );
};

export const Colors = () => {
  const classes = useStyles();

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th></th>
          {SHADES.map(shade => (
            <th key={shade} className={classes.shadeName}>
              {shade}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(antlerPalette).map(([name, values]) => (
          <tr key={name}>
            <th scope="row" align="right" className={classes.colorName}>
              {name
                .replace(/a([A-Z])/, 'Antler $1')
                .replace(/([a-z])([A-Z])/, '$1 $2')}
            </th>

            {SHADES.map(shade => (
              <td key={shade}>
                {values[shade] && (
                  <Color value={values[shade]} wide={shade === 500} />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
