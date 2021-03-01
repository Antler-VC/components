import React from 'react';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';

import { makeStyles, createStyles, Button } from '@material-ui/core';
import ChevronDownIcon from '@material-ui/icons/ExpandMore';

import { useAlgoliaContext } from './AlgoliaContext';
import Accordion, { AccordionSkeleton } from '../Accordion';

const useStyles = makeStyles(theme =>
  createStyles({
    moreButton: {
      margin: '0 auto',
      marginTop: theme.spacing(3),
      display: 'flex',
    },
  })
);

export interface ISectionedCardGridRenderProps {
  data: Record<string, any>;
}

export interface ISectionedCardGridProps {
  render: (props: ISectionedCardGridRenderProps) => React.ReactNode;
  sectionKey: string;

  filterHits?: Parameters<typeof _filter>[1];
  sortSections?: Parameters<typeof _sortBy>[1];
  // accordionProps?: (sectionName: string) => Partial<IAccordionProps>
  accordionProps?: (
    sectionName: string,
    sections: Record<string, Record<string, any>>
  ) => any;
}

export default function SectionedCardGrid({
  render,
  sectionKey,

  filterHits,
  sortSections,
  accordionProps,
}: ISectionedCardGridProps) {
  const classes = useStyles();
  const {
    algoliaState,
    getMore,
    isLoading,
    isLoadingMore,
  } = useAlgoliaContext();

  if (isLoading)
    return (
      <>
        <AccordionSkeleton />
        <AccordionSkeleton />
        <AccordionSkeleton />
        <AccordionSkeleton />
        <AccordionSkeleton />
      </>
    );

  const hits = filterHits
    ? _filter(algoliaState.hits, filterHits)
    : algoliaState.hits;

  const sections = _groupBy(hits, sectionKey);
  const sortedSections = sortSections
    ? _sortBy(Object.keys(sections), sortSections)
    : Object.keys(sections);

  return (
    <>
      {sortedSections.map(sectionName => (
        <Accordion
          key={sectionName}
          title={sectionName}
          cards={sections[sectionName].map(data => render({ data }))}
          {...(accordionProps ? accordionProps(sectionName, sections) : {})}
        />
      ))}

      {algoliaState.hasMore && (
        <Button
          variant="outlined"
          size="large"
          endIcon={<ChevronDownIcon />}
          onClick={getMore}
          className={classes.moreButton}
        >
          More
        </Button>
      )}
      {isLoadingMore && (
        <>
          <AccordionSkeleton />
          <AccordionSkeleton />
          <AccordionSkeleton />
          <AccordionSkeleton />
          <AccordionSkeleton />
        </>
      )}
    </>
  );
}
