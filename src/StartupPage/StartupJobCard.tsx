import React from 'react';
import { format, differenceInDays } from 'date-fns';

import { useTheme, Typography } from '@material-ui/core';

import ProfileCard, { IProfileCardProps } from '../Card/ProfileCard';
import Thumbnail from '../Thumbnail';
import TruncatedDescription from '../Card/TruncatedDescription';

export interface IStartupJobCardProps {
  data: {
    jobFunction: string;
    location: string;
    jobTitle: string;
    description: string;
    applicationDeadline: number;
  };

  teamName: string;
  logo?: { downloadURL: string }[];

  actionRows?: IProfileCardProps['actionRows'];
}

export default function StartupJobCard({
  data,

  teamName,
  logo,

  actionRows,
}: IStartupJobCardProps) {
  const theme = useTheme();

  const dateDiff = differenceInDays(
    data.applicationDeadline * 1000,
    new Date()
  );

  return (
    <ProfileCard
      overline={teamName}
      overlineSecondary={
        <span style={{ textAlign: 'right', display: 'block' }}>
          {[data.jobFunction, data.location].join('\n')}
        </span>
      }
      body={
        <>
          {Array.isArray(logo) && logo[0] && (
            <Thumbnail
              imageUrl={logo[0].downloadURL}
              size="400x400"
              shape="square"
              style={{
                maxWidth: 200,
                width: '80%',
                height: 80,
                objectFit: 'contain',
                objectPosition: 'center left',
                display: 'block',
              }}
            />
          )}

          <Typography variant="h6" component="h3" gutterBottom>
            {data.jobTitle}
          </Typography>
          <TruncatedDescription
            expanded={false}
            children={data.description}
            style={{ marginTop: 0 }}
          />

          <Typography
            variant="button"
            style={{
              color:
                dateDiff <= 3
                  ? theme.palette.error.main
                  : theme.palette.text.disabled,
            }}
          >
            {dateDiff <= 0
              ? 'Last day to apply'
              : dateDiff <= 3
              ? `${dateDiff} day${dateDiff !== 1 ? 's' : ''} left`
              : `Until ${format(
                  data.applicationDeadline * 1000,
                  'd MMM yyyy'
                )}`}
          </Typography>
        </>
      }
      actionRows={actionRows}
    />
  );
}
