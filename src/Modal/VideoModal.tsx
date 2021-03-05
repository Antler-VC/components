import React from 'react';
import ReactPlayer from 'react-player';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import Modal from '.';

const useStyles = makeStyles(() =>
  createStyles({
    playerWrapper: {
      position: 'relative',
      paddingTop: ({ aspect }: { aspect: string }) => aspect || '56.25%',

      '& > *': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
  })
);

export interface IVideoModalProps {
  url: string;
  onClose: () => void;
  overline?: React.ReactNode;
  title?: React.ReactNode;
}

export default function VideoModal({
  url,
  onClose,
  overline,
  title,
}: IVideoModalProps) {
  const classes = useStyles({
    aspect: url.includes('loom.com') ? '57.87781350482315%' : '',
  });

  let player = (
    <ReactPlayer url={url} playing controls width="100%" height="100%" />
  );

  if (url.includes('loom.com'))
    player = (
      <iframe
        src={url.replace('/share/', '/embed/')}
        frameBorder="0"
        allowFullScreen
      />
    );

  return (
    <Modal
      onClose={onClose}
      maxWidth="md"
      title={
        <>
          <Typography
            variant="overline"
            component="span"
            display="block"
            paragraph
          >
            {overline}
          </Typography>
          {title}
        </>
      }
    >
      <div className={classes.playerWrapper}>{player}</div>
    </Modal>
  );
}
