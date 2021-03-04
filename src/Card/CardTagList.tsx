import React from 'react';

import { Grid, Chip } from '@material-ui/core';
import CardSubheading from './CardSubheading';

export interface ICardTagListProps {
  name?: React.ReactNode;
  tags?: React.ReactNode[];
}

export default function CardTagList({ name, tags = [] }: ICardTagListProps) {
  if (tags.length === 0) return null;

  return (
    <section>
      {name && <CardSubheading>{name}</CardSubheading>}

      <Grid
        container
        spacing={1}
        style={{ fontSize: 0, padding: 0 }}
        component="ul"
      >
        {tags.map((tag, i) =>
          tag ? (
            <Grid item key={i}>
              <Chip
                label={
                  typeof tag === 'string' ? tag.replace(/\//g, ' / ') : tag
                }
                component="li"
              />
            </Grid>
          ) : null
        )}
      </Grid>
    </section>
  );
}
