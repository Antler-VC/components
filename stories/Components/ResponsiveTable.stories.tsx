import React from 'react';
import { format } from 'date-fns';

import {
  makeStyles,
  createStyles,
  Paper,
  Typography,
  Tooltip,
  Button,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

import ResponsiveTableComponent from '../../src/ResponsiveTable';

export default {
  title: 'Antler Theme/Components/Responsive Table',
};

export const ResponsiveTable = () => (
  <Paper>
    <ResponsiveTableComponent
      label={'Resources table'}
      columns={[
        {
          key: 'title',
          header: 'Title',
          width: 280,
          render: value => (
            <Typography
              color="textPrimary"
              variant="h6"
              component="h3"
              style={
                {
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': '2',
                  overflow: 'hidden',
                } as any
              }
            >
              {value}
            </Typography>
          ),
          mobileStyles: { width: '100%' },
        },
        {
          key: 'description',
          header: 'Description',
          width: 280,
          render: value => (
            <Tooltip title={value}>
              <Typography
                variant="body2"
                color="textSecondary"
                style={
                  {
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': '2',
                    overflow: 'hidden',
                  } as any
                }
              >
                {value}
              </Typography>
            </Tooltip>
          ),
          mobileStyles: { width: '100%' },
        },
        {
          key: 'createdAt',
          header: 'Date',
          width: 130,
          render: value => (
            <Typography variant="overline">
              {value ? format(new Date(value), 'd MMM yyyy') : ''}
            </Typography>
          ),
          mobileStyles: { flexGrow: 1 },
        },
        {
          key: '_action',
          header: 'Action',
          width: 110,
          variant: 'button',
          render: (_, row) => (
            <Button
              component="a"
              href={row.link}
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
              startIcon={<LinkIcon />}
            >
              Open
            </Button>
          ),
        },
      ]}
      data={new Array(10).fill({
        title: 'Lorem Ipsum Dolor Sit Amet',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        createdAt: new Date().getTime() - Math.random() * 100,
        link: 'https://antler.co',
      })}
    />
  </Paper>
);
