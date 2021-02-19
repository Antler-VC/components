import React from 'react';

import AccordionComponent from '../../src/Accordion';
import FounderCard from '../../src/Card/FounderCard';

export default {
  title: 'Antler Theme/Components/Accordion',
  component: AccordionComponent,
  argTypes: {
    initiallyExpanded: {
      name: 'Expanded',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    title: {
      defaultValue: 'Startup Updates',
      control: { type: 'text' },
    },
    count: {
      defaultValue: '6',
      control: { type: 'text' },
    },
    chips: {
      defaultValue: [],
      control: { type: 'array' },
    },
    cards: { table: { disable: true }, control: { disable: true } },
    cardContainerProps: {
      table: { disable: true },
      control: { disable: true },
    },
    ref: { table: { disable: true }, control: { disable: true } },
  },
};

const cardArgs = {
  overline: 'Portfolio',
  overlineSecondary: 'May 2020',
  title: 'AppBoxo',
  body:
    'Appboxo is a super app infrastructure platform that allows companies to launch and integrate mini-apps within their software. They recently completed a US$1.1m seed funding round led by Founders Fund, with participation from 500 Startups, Plug and Play Tech Center and Antler. They plan to use the fresh funds to scale the platform and add new mini-apps in travel, e-commerce, finance, and lifestyle industries.',
  buttonLabel: 'Learn More',
  buttonLink: 'https://google.com/',
  imageSource:
    'https://images.prismic.io/antlerco/f14c11d3-6c58-46d0-b22c-83bf8bfa9fe9_Antler+Appboxo+Team+picture.jpg?auto=compress,format&rect=0,313,6000,3375&w=1920&h=1080',
};

export const Accordion = args => (
  <>
    <AccordionComponent
      {...args}
      cards={new Array(6).fill(undefined).map((_, i) => (
        <FounderCard
          key={i}
          {...cardArgs}
          image={{ imageUrl: cardArgs.imageSource }}
          actionRows={
            cardArgs.buttonLabel
              ? [
                  {
                    primaryLink: {
                      label: cardArgs.buttonLabel,
                      href: cardArgs.buttonLink,
                      target: '_blank',
                      rel: 'noopener noreferer',
                    },
                  },
                ]
              : []
          }
        />
      ))}
    />
    <AccordionComponent
      {...args}
      cards={new Array(6).fill(undefined).map((_, i) => (
        <FounderCard
          key={i}
          {...cardArgs}
          image={{ imageUrl: cardArgs.imageSource }}
          actionRows={
            cardArgs.buttonLabel
              ? [
                  {
                    primaryLink: {
                      label: cardArgs.buttonLabel,
                      href: cardArgs.buttonLink,
                      target: '_blank',
                      rel: 'noopener noreferer',
                    },
                  },
                ]
              : []
          }
        />
      ))}
    />
  </>
);
