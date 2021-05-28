import React, { useState } from 'react';
import clsx from 'clsx';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';

import { makeStyles, createStyles, Fab } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',

      '& .slider': {
        alignItems: 'center',
      },
    },

    fab: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,

      backgroundColor: theme.palette.background.paper,
    },
    fabPrev: {
      left: theme.spacing('xxs'),
      [theme.breakpoints.up('xl')]: {
        left: 0,
        transform: 'translateY(-50%) translateX(-50%)',
      },
    },
    fabNext: {
      right: theme.spacing('xxs'),
      [theme.breakpoints.up('xl')]: {
        right: 0,
        transform: 'translateY(-50%) translateX(50%)',
      },
    },
  })
);

export interface IStartupMediaProps {
  pitchVideo?: string;
  headerImage?: { downloadURL: string }[];
  additionalImages?: { downloadURL: string }[];
}

export default function StartupMedia({
  pitchVideo,
  headerImage,
  additionalImages,
}: IStartupMediaProps) {
  const classes = useStyles();

  const [selected, setSelected] = useState(0);

  const slides = [
    pitchVideo ? (
      <ReactPlayer url={pitchVideo} width="100%" controls playsinline pip />
    ) : null,
    Array.isArray(headerImage) && headerImage[0]?.downloadURL ? (
      <img
        key={headerImage[0].downloadURL}
        src={headerImage[0].downloadURL}
        alt=""
        style={{ display: 'block' }}
      />
    ) : null,
    ...(Array.isArray(additionalImages) && additionalImages[0]?.downloadURL
      ? additionalImages.map((img) => (
          <img
            key={img?.downloadURL}
            src={img?.downloadURL}
            alt=""
            style={{ display: 'block' }}
          />
        ))
      : []),
  ].filter((x) => x !== null) as React.ReactChild[];

  if (slides.length === 0) return null;

  return (
    <div className={classes.root}>
      {slides.length > 1 && (
        <Fab
          aria-label="Previous Slide"
          onClick={() => setSelected((i) => Math.abs((i - 1) % slides.length))}
          size="small"
          className={clsx(classes.fab, classes.fabPrev)}
        >
          <ChevronLeftIcon />
        </Fab>
      )}
      {slides.length > 1 && (
        <Fab
          aria-label="Next Slide"
          onClick={() => setSelected((i) => Math.abs((i + 1) % slides.length))}
          size="small"
          className={clsx(classes.fab, classes.fabNext)}
        >
          <ChevronRightIcon />
        </Fab>
      )}

      <Carousel
        autoPlay={false}
        selectedItem={selected}
        showIndicators={false}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        interval={5000}
      >
        {slides}
      </Carousel>
    </div>
  );
}
