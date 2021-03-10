import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogProps,
  IconButton,
  Zoom,
  Fab,
  Tab,
  Divider,
  DialogContent,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { SlideTransitionMui } from './SlideTransition';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '--spacing-modal': theme.spacing('m') + 'px',
      '--spacing-modal-contents': theme.spacing('s') + 'px',
      '--spacing-card': 'var(--spacing-modal-contents)',

      [theme.breakpoints.down('sm')]: {
        '--spacing-modal': theme.spacing('xs') + 'px',
      },
    },

    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },

    paper: {
      overflow: 'visible',

      padding: 'var(--spacing-modal)',
      paddingBottom: 0,

      '& > * + *': { marginTop: 'var(--spacing-modal-contents)' },
    },
    paperScrollBody: {
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
    },

    closeButton: {
      width: 48,
      margin: theme.spacing(-1.5),
      marginLeft: 'auto',
    },

    navButton: {
      position: 'absolute',
      top: 'calc(var(--spacing-modal) * 2)',
      marginTop: 0,
    },
    navButtonPrev: {
      left: -56 + theme.spacing('xs'),
      transformOrigin: `calc(100% - ${theme.spacing('xs')}px) 50%`,
    },
    navButtonNext: {
      right: -56 + theme.spacing('xs'),
      transformOrigin: `${theme.spacing('xs')}px 50%`,
    },

    tabs: {
      marginLeft: 'calc(var(--spacing-modal) * -1)',
      marginRight: 'calc(var(--spacing-modal) * -1)',
    },
    tab: { minWidth: 0 },
    divider: {
      margin: '-1px calc(var(--spacing-modal) * -1) 0',
    },

    tabPanel: {
      marginTop: 'var(--spacing-modal-contents)',
      padding: 0,

      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',

      '& > * + *': { marginTop: 'var(--spacing-modal-contents)' },
      '&[hidden]': { display: 'none' },
    },

    content: {
      padding: '0 var(--spacing-modal) var(--spacing-modal)',
      margin: '0 calc(var(--spacing-modal) * -1)',

      ...theme.typography.body1,
    },
    bodyOnly: {
      marginTop: 'var(--spacing-modal-contents)',
      '& > * + *': { marginTop: 'var(--spacing-modal-contents)' },

      // https://codepen.io/evank/pen/wWbRNO
      background: `
        linear-gradient(${theme.palette.background.paper} 50%, ${fade(
        theme.palette.background.paper,
        0
      )}),
        linear-gradient(${fade(theme.palette.background.paper, 0)}, ${
        theme.palette.background.paper
      } 50%) 0 100%,
        linear-gradient(to top, ${theme.palette.divider} 1px, ${fade(
        theme.palette.divider,
        0
      )}),
        linear-gradient(to top, ${theme.palette.divider} 1px, ${fade(
        theme.palette.divider,
        0
      )}) 0 calc(100% - 0.5px)`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'white',
      backgroundSize: '100% 2px, 100% 3px, 100% 1px, 100% 1px',
      backgroundAttachment: 'local, local, scroll, scroll',
    },
  })
);

export interface IDetailsModalProps
  extends Partial<Omit<DialogProps, 'title'>> {
  onClose: () => void;
  initialTab?: string;

  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;

  header?: React.ReactNode;
  footer?: React.ReactNode;

  tabs?: {
    label: React.ReactNode;
    body: React.ReactNode;
    disabled?: boolean;
  }[];
  body?: React.ReactNode;
  bodyKey?: string;
}

export default function DetailsModal({
  onClose,
  initialTab = '0',
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  header,
  footer,
  tabs = [],
  body,
  bodyKey,
  ...props
}: IDetailsModalProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 300);
  };

  const [tab, setTab] = useState(initialTab);
  const handleChangeTab = (_: React.ChangeEvent<{}>, newValue: string) =>
    setTab(newValue);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef?.current)
      scrollContainerRef.current.scrollTo({ top: 0, left: 0 });
  }, [tab]);

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideTransitionMui}
      onClose={handleClose}
      fullWidth
      keepMounted
      fullScreen={isMobile}
      aria-labelledby="modal-title"
      classes={{
        root: classes.root,
        container: classes.container,
        paper: classes.paper,
        paperScrollBody: classes.paperScrollBody,
      }}
      {...props}
    >
      <IconButton
        onClick={handleClose}
        className={classes.closeButton}
        aria-label="Close"
        color="secondary"
      >
        <CloseIcon />
      </IconButton>

      {!!onPrev && !isTablet && (
        <Zoom in={hasPrev}>
          <Fab
            onClick={onPrev}
            color="secondary"
            className={clsx(classes.navButton, classes.navButtonPrev)}
          >
            <ChevronLeftIcon />
          </Fab>
        </Zoom>
      )}

      {!!onNext && !isTablet && (
        <Zoom in={hasNext}>
          <Fab
            onClick={onNext}
            color="secondary"
            className={clsx(classes.navButton, classes.navButtonNext)}
          >
            <ChevronRightIcon />
          </Fab>
        </Zoom>
      )}

      {header}

      {body ? (
        <DialogContent
          key={bodyKey}
          className={clsx(classes.content, classes.bodyOnly)}
        >
          {body}
        </DialogContent>
      ) : (
        <TabContext value={tab}>
          <TabList
            className={classes.tabs}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Modal tabs"
            action={actions =>
              setTimeout(() => actions?.updateIndicator(), 200)
            }
          >
            {tabs?.map((tab, i) => (
              <Tab
                key={`modal-tab-${i}`}
                className={classes.tab}
                label={tab.label}
                value={i.toString()}
                disabled={tab.disabled}
              />
            ))}
          </TabList>
          <Divider className={classes.divider} />

          <DialogContent className={classes.content} ref={scrollContainerRef}>
            {tabs.map((tab, i) => (
              <TabPanel
                key={i}
                value={i.toString()}
                className={classes.tabPanel}
              >
                {tab.body}
              </TabPanel>
            ))}
          </DialogContent>

          {footer}
        </TabContext>
      )}

      {body && footer}
    </Dialog>
  );
}
