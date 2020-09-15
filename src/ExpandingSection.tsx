import React, { useState } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Accordion,
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

import CardGridItem from './CardGrid/CardGridItem';
import CardGridContainer from './CardGrid/CardGridContainer';

const useStyles = makeStyles(theme =>
  createStyles({
    accordion: {
      backgroundColor: 'transparent',
      '&::before': { display: 'none' },
      '&$accordionExpanded': { margin: 0 },
      '& + &': { marginTop: theme.spacing(4) },
    },
    accordionExpanded: {},

    accordionSummary: {
      padding: 0,
      borderBottom: '1px solid ' + theme.palette.divider,

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
      textTransform: 'uppercase',
      letterSpacing: 3,
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
      backgroundColor: theme.palette.text.secondary,
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
      paddingTop: theme.spacing(3),
    },
  })
);

interface IExpandingSectionProps
  extends Partial<Omit<AccordionProps, 'title'>> {
  initiallyExpanded?: boolean;
  title: React.ReactNode;
  chips?: string[];
  cards: React.ReactNodeArray;
  cardContainerProps?: Partial<GridProps>;
}

const ExpandingSection: React.FunctionComponent<IExpandingSectionProps> = ({
  initiallyExpanded = true,
  title,
  chips,
  cards,
  cardContainerProps,
  ...rootProps
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <Accordion
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
        disableRipple={false}
      >
        <Grid item xs>
          <Typography
            variant="h6"
            component="h4"
            color="textSecondary"
            className={classes.title}
          >
            {title}
          </Typography>
          {chips && (
            <Grid container spacing={2} className={classes.chipGrid}>
              {chips?.map(chip => (
                <Grid item key={chip}>
                  <Chip
                    label={chip}
                    variant="default"
                    color="secondary"
                    className={classes.chip}
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item className={classes.showAllText}>
          <Grid container alignItems="center">
            <Typography variant="h6" component="span" className={classes.title}>
              {expanded ? 'Collapse' : `Show all (${cards.length})`}
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
        <CardGridContainer>
          {cards.map((card, i) => (
            <CardGridItem key={i} {...cardContainerProps}>
              {card}
            </CardGridItem>
          ))}
        </CardGridContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpandingSection;

export const ExpandingSectionSkeleton: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Accordion
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
    </Accordion>
  );
};
