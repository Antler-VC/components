import React, { useState, useEffect } from 'react';

import { makeStyles, createStyles, Tab, Divider } from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import CardBody from './CardBody';

import FounderCard, { IFounderCardProps } from './FounderCard';

const useStyles = makeStyles(() =>
  createStyles({
    tabs: {
      marginLeft: 'calc(var(--spacing-card) * -1)',
      marginRight: 'calc(var(--spacing-card) * -1)',
    },

    tab: { minWidth: 0 },

    divider: {
      margin: '-1px calc(var(--spacing-card) * -1) 0',
    },

    tabPanel: {
      marginTop: 'var(--spacing-card)',
      padding: 0,

      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',

      '& > * + *': { marginTop: 'var(--spacing-card)' },
      '&[hidden]': { display: 'none' },
    },
  })
);

export interface IFounderTabbedCardProps
  extends Omit<IFounderCardProps, 'body'> {
  tabs: {
    label: React.ReactNode;
    body: React.ReactNode;
    disabled?: boolean;
  }[];
  initialTab?: string;
  onTabChange?: (tab: string) => void;

  contentBeforeTabs?: React.ReactNode;
  contentAfterTabs?: React.ReactNode;
}

export default function FounderTabbedCard({
  tabs = [],
  initialTab = '0',
  onTabChange,
  contentBeforeTabs,
  contentAfterTabs,
  ...props
}: IFounderTabbedCardProps) {
  const classes = useStyles();

  const [tab, setTab] = useState(initialTab);
  const handleChangeTab = (_: React.ChangeEvent<{}>, newValue: string) =>
    setTab(newValue);
  useEffect(() => {
    if (onTabChange) onTabChange(tab);
  }, [tab]);

  return (
    <FounderCard
      {...props}
      body={
        <>
          <TabContext value={tab}>
            {contentBeforeTabs}

            <TabList
              className={classes.tabs}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="Card tabs"
            >
              {tabs?.map((tab, i) => (
                <Tab
                  key={`card-tab-${i}`}
                  className={classes.tab}
                  label={tab.label}
                  value={i.toString()}
                  disabled={tab.disabled}
                />
              ))}
            </TabList>
            <Divider className={classes.divider} />

            {tabs.map((tab, i) => (
              <TabPanel
                key={i}
                value={i.toString()}
                className={classes.tabPanel}
              >
                <CardBody body={tab.body} />
              </TabPanel>
            ))}

            {contentAfterTabs}
          </TabContext>
        </>
      }
    />
  );
}
