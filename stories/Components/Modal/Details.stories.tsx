import React, { useState } from 'react';

import DetailsModal from '../../../src/Modal/DetailsModal';
import ProfileCardHeading from '../../../src/Card/ProfileCardHeading';
import CardInfoList from '../../../src/Card/CardInfoList';
import CardTagList from '../../../src/Card/CardTagList';

export default {
  title: 'Antler Theme/Components/Modal',
  argTypes: {
    overline: {
      defaultValue: 'Portfolio',
      control: { type: 'text' },
    },
    title: {
      defaultValue: 'AppBoxo',
      control: { type: 'text' },
    },
    imageSource: {
      defaultValue:
        'https://images.prismic.io/antlerco/f14c11d3-6c58-46d0-b22c-83bf8bfa9fe9_Antler+Appboxo+Team+picture.jpg?auto=compress,format&rect=0,313,6000,3375&w=1920&h=1080',
      control: { type: 'text' },
    },
    body: {
      defaultValue:
        'Appboxo is a super app infrastructure platform that allows companies to launch and integrate mini-apps within their software. They recently completed a US$1.1m seed funding round led by Founders Fund, with participation from 500 Startups, Plug and Play Tech Center and Antler. They plan to use the fresh funds to scale the platform and add new mini-apps in travel, e-commerce, finance, and lifestyle industries.',
      control: { type: 'text' },
    },
  },
};

export const Details = args => {
  const [index, setIndex] = useState(0);

  return (
    <DetailsModal
      hasPrev={index > 0}
      hasNext={index < 2}
      onPrev={() => setIndex(i => i - 1)}
      onNext={() => setIndex(i => i + 1)}
      onClose={() => alert('CLOSE')}
      header={
        <div style={{ marginTop: 'calc(var(--spacing-modal-contents) * -1)' }}>
          <ProfileCardHeading
            overline={
              <div style={{ marginBottom: 'var(--spacing-modal-contents)' }}>
                {args.overline}
              </div>
            }
            title={
              <span id="modal-title">
                {args.title} ({index})
              </span>
            }
            image={{ imageUrl: args.imageSource }}
          />
        </div>
      }
      body={
        <>
          {args.body}
          <CardInfoList
            infoList={[
              { name: 'Primary', value: 'Consumer' },
              { name: 'B. Model', value: 'Marketplace' },
              { name: 'Founded', value: 'May 2020' },
              { name: 'Website', value: 'appboxo.com' },
            ]}
          />
          <CardTagList
            name="Focus Area"
            tags={['Corporate Strategy', 'IoT Solutions', 'E-Commerce']}
          />
        </>
      }
    />
  );
};

export const DetailsTabbed = args => {
  const [index, setIndex] = useState(0);

  return (
    <DetailsModal
      hasPrev={index > 0}
      hasNext={index < 2}
      onPrev={() => setIndex(i => i - 1)}
      onNext={() => setIndex(i => i + 1)}
      onClose={() => alert('CLOSE')}
      header={
        <div style={{ marginTop: 'calc(var(--spacing-modal-contents) * -1)' }}>
          <ProfileCardHeading
            overline={
              <div style={{ marginBottom: 'var(--spacing-modal-contents)' }}>
                {args.overline}
              </div>
            }
            title={
              <span id="modal-title">
                {args.title} ({index})
              </span>
            }
            image={{ imageUrl: args.imageSource }}
          />
        </div>
      }
      tabs={[
        {
          label: args.tabLabel,
          body: (
            <>
              {args.body}
              <CardInfoList
                infoList={[
                  { name: 'Primary', value: 'Consumer' },
                  { name: 'B. Model', value: 'Marketplace' },
                  { name: 'Founded', value: 'May 2020' },
                  { name: 'Website', value: 'appboxo.com' },
                ]}
              />
              <CardTagList
                name="Focus Area"
                tags={['Corporate Strategy', 'IoT Solutions', 'E-Commerce']}
              />
            </>
          ),
        },
        {
          label: 'Info',
          body: (
            <>
              {args.body}
              <CardInfoList
                infoList={[
                  { name: 'Primary', value: 'Consumer' },
                  { name: 'B. Model', value: 'Marketplace' },
                  { name: 'Founded', value: 'May 2020' },
                  { name: 'Website', value: 'appboxo.com' },
                ]}
              />
              <CardTagList
                name="Focus Area"
                tags={['Corporate Strategy', 'IoT Solutions', 'E-Commerce']}
              />
            </>
          ),
        },
        { label: 'Disabled', body: null, disabled: true },
      ]}
    />
  );
};
DetailsTabbed.argTypes = {
  tabLabel: {
    defaultValue: 'About',
    control: { type: 'text' },
  },
};
