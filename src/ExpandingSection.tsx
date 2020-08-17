import React, { useState } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  ExpansionPanel,
  ExpansionPanelProps,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
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
    expansionPanel: {
      backgroundColor: 'transparent',
      '&::before': { display: 'none' },
      '&$expansionPanelExpanded': { margin: 0 },
      '& + &': { marginTop: theme.spacing(4) },
    },
    expansionPanelExpanded: {},

    expansionPanelSummary: {
      padding: 0,
      borderBottom: '1px solid ' + theme.palette.divider,

      '&$expansionPanelSummaryExpanded': { minHeight: 48 },
    },
    expansionPanelSummaryContent: {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'baseline',

      margin: theme.spacing(1, 0),
      '&$expansionPanelSummaryExpanded': { margin: theme.spacing(1, 0) },
    },
    expansionPanelSummaryExpanded: {},

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

    expansionPanelDetails: {
      padding: 0,
      paddingTop: theme.spacing(3),
    },
  })
);

interface IExpandingSectionProps
  extends Partial<Omit<ExpansionPanelProps, 'title'>> {
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
    <ExpansionPanel
      expanded={expanded}
      onChange={(_, v) => setExpanded(v)}
      elevation={0}
      square
      classes={{
        root: classes.expansionPanel,
        expanded: classes.expansionPanelExpanded,
      }}
      TransitionProps={{ unmountOnExit: true }}
      {...rootProps}
    >
      <ExpansionPanelSummary
        classes={{
          root: classes.expansionPanelSummary,
          content: classes.expansionPanelSummaryContent,
          expanded: classes.expansionPanelSummaryExpanded,
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
      </ExpansionPanelSummary>

      <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetails }}>
        <CardGridContainer>
          {cards.map((card, i) => (
            <CardGridItem key={i} {...cardContainerProps}>
              {card}
            </CardGridItem>
          ))}
        </CardGridContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandingSection;

export const ExpandingSectionSkeleton: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ExpansionPanel
      expanded={false}
      elevation={0}
      square
      classes={{
        root: classes.expansionPanel,
        expanded: classes.expansionPanelExpanded,
      }}
    >
      <ExpansionPanelSummary
        classes={{
          root: classes.expansionPanelSummary,
          content: classes.expansionPanelSummaryContent,
        }}
      >
        <Skeleton width={isSm ? '40%' : 220} height={isSm ? 28 : 32} />
        <Skeleton
          width={isSm ? '20%' : 120}
          height={isSm ? 28 : 32}
          style={{ marginLeft: 'auto' }}
        />
      </ExpansionPanelSummary>
    </ExpansionPanel>
  );
};
