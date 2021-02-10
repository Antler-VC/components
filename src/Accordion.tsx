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
import Skeleton from '@material-ui/lab/Skeleton';
import ExpandMoreIcon from '@material-ui/icons/ArrowDropDown';

import CardGrid from './CardGrid';

const useStyles = makeStyles(theme =>
  createStyles({
    accordion: {
      backgroundColor: 'transparent',
      '&::before': { display: 'none' },
      '&$accordionExpanded': { margin: 0 },
      '& + &': { marginTop: theme.spacing('l') },
    },
    accordionExpanded: {},

    accordionSummary: {
      padding: 0,
      borderBottom: '1px solid ' + theme.palette.antler.gray[700],

      '&$accordionSummaryExpanded': { minHeight: 48 },
    },
    accordionSummaryContent: {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'baseline',

      margin: theme.spacing(1, 0),
      '&$accordionSummaryExpanded': { margin: theme.spacing(1, 0) },
    },
    accordionSummaryExpanded: {},

    title: {
      display: 'inline-block',
      marginRight: theme.spacing(2),
    },
    chipGrid: {
      display: 'inline-flex',
      width: 'auto',
      marginTop: 0,
      marginRight: theme.spacing(2),
    },
    chip: {
      verticalAlign: 'baseline',
      cursor: 'inherit',
    },
    showAllText: {
      marginLeft: 'auto',
      '& $title': { marginRight: theme.spacing(0.5) },
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
      paddingTop: theme.spacing('m'),
    },
  })
);

interface IExpandingSectionProps
  extends Partial<Omit<AccordionProps, 'title' | 'children'>> {
  initiallyExpanded?: boolean;
  title: React.ReactNode;
  chips?: string[];
  cards?: React.ReactNodeArray;
  children?: React.ReactNode;
  count?: React.ReactNode;
  cardContainerProps?: Partial<GridProps>;
}

const ExpandingSection: React.FunctionComponent<IExpandingSectionProps> = ({
  initiallyExpanded = true,
  title,
  chips,
  cards,
  children,
  count,
  cardContainerProps,
  ...rootProps
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <MuiAccordion
      expanded={expanded}
      onChange={(_, v) => setExpanded(v)}
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
          {chips && (
            <Grid container spacing={2} className={classes.chipGrid}>
              {chips?.map(chip => (
                <Grid item key={chip}>
                  <Chip label={chip} className={classes.chip} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item className={classes.showAllText}>
          <Grid container alignItems="center">
            <Typography variant="button" component="span">
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
};

export default ExpandingSection;

export const ExpandingSectionSkeleton: React.FunctionComponent = () => {
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
};
