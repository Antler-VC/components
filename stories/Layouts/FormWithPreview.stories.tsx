import React from 'react';

import { Container } from '@material-ui/core';
import TopBar from './TopBar';
import LayoutComponent from '../../src/layouts/FormWithPreview';
import { Form, FieldType } from '@antlerengineering/form-builder';
import ProfileCard from '../../src/Card/ProfileCard';

export default {
  title: 'Antler Theme/Layouts/Form With Preview',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    paperHeader: {
      defaultValue: '',
      control: { type: 'text' },
    },
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

export const FormWithPreview = args => {
  return (
    <>
      <TopBar />

      <Container>
        <LayoutComponent
          paperHeader={args.paperHeader}
          children={
            <Form
              fields={[
                {
                  type: FieldType.shortText,
                  name: 'desc',
                  label: 'Description',
                  defaultValue: 'something',
                },
                {
                  type: FieldType.paragraph,
                  name: 'desc',
                  label: 'Description',
                  defaultValue: 'something',
                },
                {
                  type: FieldType.paragraph,
                  name: 'desc',
                  label: 'Description',
                  defaultValue: 'something',
                },
                {
                  type: FieldType.paragraph,
                  name: 'desc',
                  label: 'Description',
                  defaultValue: 'something',
                },
                {
                  type: FieldType.paragraph,
                  name: 'desc',
                  label: 'Description',
                  defaultValue: 'something',
                },
              ]}
              onSubmit={() => {}}
              autoSave
            />
          }
          previewContent={
            <ProfileCard
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
          }
        ></LayoutComponent>
      </Container>
    </>
  );
};
