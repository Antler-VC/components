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
    li: {
      listStyleType: 'none',
      marginTop: theme.spacing('xxs'),
      marginLeft: theme.spacing(-0.5),
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
            <li key={i} className={classes.li}>
              <PersonChip {...chip} />
            </li>
          ) : null
        )}
      </ul>
    </section>
  );
}
