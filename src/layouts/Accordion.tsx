import React, { useState } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Accordion as MuiAccordion,
  AccordionProps,
  AccordionSummary,
  AccordionDetails,
  Grid,
  GridProps,
  Typography,
  Chip,
} from '@material-ui/core';
import { spacingFn } from '../Theme/spacing';
import Skeleton from '@material-ui/lab/Skeleton';
import ExpandMoreIcon from '@material-ui/icons/ArrowDropDown';

import CardGrid from './CardGrid';

const useStyles = makeStyles(theme =>
  createStyles({
    accordion: {
      backgroundColor: 'transparent',
      '&::before': { display: 'none' },
      '&$accordionExpanded': { margin: 0 },

      '& + &': {
        marginTop: spacingFn('l'),
        [theme.breakpoints.down('sm')]: { marginTop: spacingFn('m') },
      },
    },
    accordionExpanded: {},

    accordionSummary: {
      padding: 0,
      borderBottom: '1px solid ' + theme.palette.antler.gray[700],

      '&, &$accordionSummaryExpanded': { minHeight: 0 },
    },
    accordionSummaryContent: {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'flex-end',

      '&, &$accordionSummaryExpanded': {
        margin: 0,
        marginBottom: theme.spacing('xxs'),
      },
    },
    accordionSummaryExpanded: {},

    title: {
      display: 'inline-block',
      marginRight: theme.spacing('xs'),

      [theme.breakpoints.down('sm')]: theme.typography.h6,
    },
    chipGrid: {
      display: 'inline-flex',
      width: 'auto',
      marginTop: 0,
      marginRight: theme.spacing('xs'),
    },
    chip: {
      verticalAlign: 'baseline',
      cursor: 'inherit',
    },

    expand: {
      marginLeft: 'auto',
      '& $title': { marginRight: theme.spacing(0.5) },
    },
    expandText: {
      [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    expandIcon: {
      color: theme.palette.text.primary,
      transition: theme.transitions.create('transform'),
    },
    expandIconExpanded: {
      transform: 'rotate(180deg)',
    },

    accordionDetails: {
      padding: 0,
      paddingTop: spacingFn('m'),

      [theme.breakpoints.down('sm')]: { paddingTop: spacingFn('xs') },
    },
  })
);

export interface IAccordionProps
  extends Partial<Omit<AccordionProps, 'title' | 'children'>> {
  initiallyExpanded?: boolean;
  title: React.ReactNode;
  chips?: string[];
  cards?: React.ReactNodeArray;
  children?: React.ReactNode;
  count?: React.ReactNode;
  cardContainerProps?: Partial<GridProps>;
}

export default function Accordion({
  initiallyExpanded = true,
  title,
  chips,
  cards,
  children,
  count,
  cardContainerProps,
  ...rootProps
}: IAccordionProps) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <MuiAccordion
      expanded={expanded}
      onChange={(_: any, v) => setExpanded(v)}
      elevation={0}
      square
      classes={{
        root: classes.accordion,
        expanded: classes.accordionExpanded,
      }}
      TransitionProps={{ unmountOnExit: true }}
      {...rootProps}
    >
      <AccordionSummary
        classes={{
          root: classes.accordionSummary,
          content: classes.accordionSummaryContent,
          expanded: classes.accordionSummaryExpanded,
        }}
        // disableRipple={false}
      >
        <Grid item xs>
          <Typography
            variant="h5"
            component="h2"
            color="textSecondary"
            className={classes.title}
          >
            {title}
          </Typography>
          {Array.isArray(chips) && chips.length > 0 && (
            <Grid container spacing={2} className={classes.chipGrid}>
              {chips?.map(chip => (
                <Grid item key={chip}>
                  <Chip label={chip} className={classes.chip} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item className={classes.expand}>
          <Grid container alignItems="center">
            <Typography
              variant="button"
              component="span"
              className={classes.expandText}
            >
              {expanded
                ? 'Collapse'
                : 'Expand' +
                  (Array.isArray(cards) || count
                    ? ` (${count ?? cards?.length})`
                    : '')}
            </Typography>
            <ExpandMoreIcon
              className={clsx(
                classes.expandIcon,
                expanded && classes.expandIconExpanded
              )}
            />
          </Grid>
        </Grid>
      </AccordionSummary>

      <AccordionDetails classes={{ root: classes.accordionDetails }}>
        {Array.isArray(cards) && <CardGrid>{cards}</CardGrid>}
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
}

export function AccordionSkeleton() {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAccordion
      expanded={false}
      elevation={0}
      square
      classes={{
        root: classes.accordion,
        expanded: classes.accordionExpanded,
      }}
    >
      <AccordionSummary
        classes={{
          root: classes.accordionSummary,
          content: classes.accordionSummaryContent,
        }}
      >
        <Skeleton width={isSm ? '40%' : 220} height={isSm ? 28 : 32} />
        <Skeleton
          width={isSm ? '20%' : 120}
          height={isSm ? 28 : 32}
          style={{ marginLeft: 'auto' }}
        />
      </AccordionSummary>
    </MuiAccordion>
  );
}
