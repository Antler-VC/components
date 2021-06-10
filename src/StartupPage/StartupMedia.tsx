import React, { useState } from 'react';
import clsx from 'clsx';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Props } from 'react-responsive-carousel/lib/ts/components/Carousel';
import ReactPlayer from 'react-player';

import { makeStyles, createStyles, Fab } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',

      '& .carousel-root': {
        margin: '0 20px',
        [theme.breakpoints.up('xl')]: {
          margin: 0,
        },
      },

      '& .slider': {
        alignItems: 'center',
      },

      '& .carousel .slide iframe': {
        width: '100%',
        margin: 0,
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
      left: 0,
      [theme.breakpoints.up('xl')]: {
        transform: 'translateY(-50%) translateX(-50%)',
      },
    },
    fabNext: {
      right: 0,
      [theme.breakpoints.up('xl')]: {
        transform: 'translateY(-50%) translateX(50%)',
      },
    },

    playerWrapper: {
      width: '100%',
      height: 0,
      paddingTop: '56.25%',

      '& iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
      },
    },

    imageWrapper: {
      width: '100%',
      height: 0,
      paddingTop: '75%',

      '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        objectFit: 'contain',
      },
    },
  })
);

export interface IStartupMediaProps {
  pitchVideo?: string;
  headerImage?: { downloadURL: string }[];
  additionalImages?: { downloadURL: string }[];
  CarouselProps?: Partial<Props>;
}

export default function StartupMedia({
  pitchVideo,
  headerImage,
  additionalImages,
  CarouselProps,
}: IStartupMediaProps) {
  const classes = useStyles();

  const [selected, setSelected] = useState(0);

  const slides = [
    pitchVideo ? (
      <div key={pitchVideo} className={classes.playerWrapper}>
        <ReactPlayer
          url={pitchVideo}
          width="100%"
          height="100%"
          controls
          playsinline
          pip
        />
      </div>
    ) : null,
    Array.isArray(headerImage) && headerImage[0]?.downloadURL ? (
      <div key={headerImage[0].downloadURL} className={classes.imageWrapper}>
        <img src={headerImage[0].downloadURL} alt="" />
      </div>
    ) : null,
    ...(Array.isArray(additionalImages) && additionalImages[0]?.downloadURL
      ? additionalImages.map(img => (
          <div key={img?.downloadURL} className={classes.imageWrapper}>
            <img src={img?.downloadURL} alt="" />
          </div>
        ))
      : []),
  ].filter(x => x !== null) as React.ReactChild[];

  if (slides.length === 0) return null;

  return (
    <div className={classes.root}>
      {slides.length > 1 && (
        <Fab
          aria-label="Previous Slide"
          onClick={() =>
            setSelected(i => (i === 0 ? slides.length - 1 : i - 1))
          }
          size="small"
          className={clsx(classes.fab, classes.fabPrev)}
        >
          <ChevronLeftIcon />
        </Fab>
      )}
      {slides.length > 1 && (
        <Fab
          aria-label="Next Slide"
          onClick={() => setSelected(i => Math.abs((i + 1) % slides.length))}
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
        {...CarouselProps}
      >
        {slides}
      </Carousel>
    </div>
  );
}
