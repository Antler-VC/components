import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core';

import CardSubheading from './CardSubheading';
import PersonChip, { IPersonChipProps } from './PersonChip';

const useStyles = makeStyles(theme =>
  createStyles({
    ul: {
      padding: 0,
      margin: 0,
    },
    chip: {
      marginTop: theme.spacing('xxs'),
      marginLeft: theme.spacing(-0.5),

      display: 'flex',
      justifyContent: 'flex-start',
    },
  })
);

export interface IPersonChipListProps {
  name?: React.ReactNode;
  chips?: IPersonChipProps[];
}

export default function PersonChipList({
  name,
  chips = [],
}: IPersonChipListProps) {
  const classes = useStyles();

  if (chips.length === 0) return null;

  return (
    <section>
      {name && <CardSubheading>{name}</CardSubheading>}

      <ul className={classes.ul}>
        {chips.map((chip, i) =>
          chip ? (
            <PersonChip
              key={i}
              component="li"
              className={classes.chip}
              {...chip}
            />
          ) : null
        )}
      </ul>
    </section>
  );
}
