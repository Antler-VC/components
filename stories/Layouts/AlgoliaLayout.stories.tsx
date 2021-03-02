import React from 'react';

import AlgoliaLayout from '../../src/layouts/AlgoliaLayout/AlgoliaLayout';
import InfiniteCardGrid from '../../src/layouts/AlgoliaLayout/InfiniteCardGrid';
import ProfileCard from '../../src/Card/ProfileCard';

export default {
  title: 'Antler Theme/Layouts/Algolia',
  argTypes: {
    sideFilters: {
      defaultValue: 'true',
      control: { type: 'boolean' },
      name: 'Show filters on the side on large screens (MD+)',
    },
  },
};

const filters = [
  { label: 'Cohort', facet: 'cohort' },
  { label: 'Location', facet: 'location' },
  { label: 'Sector', facet: 'sector' },
  { label: 'Tags (Focus Area)', facet: 'focusArea' },
  { label: 'Business Model', facet: 'businessModel' },
  { label: 'Founding Year', facet: 'year' },
];

export const Algolia = args => (
  <AlgoliaLayout
    // Algolia keys from antler.co public site
    appId="B6E2V80XVH"
    searchKey="M2ZhYzZhMDcwN2QwMDlkMWFmNjdkMGM0YWE5MjYxNjlkZDRlYjFkZGY3YjQzNWJkZDgzZjgwZjRhMDBkYzY5MXJlc3RyaWN0SW5kaWNlcz0lNUIlMjJwb3J0Zm9saW8lMjIlMkMlMjJwb3J0Zm9saW9fam9icyUyMiU1RCZmaWx0ZXJzPXNob3dPbldlYnNpdGUlM0F0cnVl"
    indexName="portfolio"
    initialRequest={{ hitsPerPage: 500 }}
    label="Portfolio"
    filters={filters}
    sideFilters={args.sideFilters}
  >
    <InfiniteCardGrid
      render={({ data }) => (
        <ProfileCard
          overline={Array.isArray(data.sector) && data.sector.join(', ')}
          overlineSecondary={data.year}
          title={data.teamName}
          image={{
            imageUrl: data.logo?.[0]?.downloadURL,
            objectFit: 'contain',
          }}
          body={data.oneLineDescription}
          actionRows={[
            {
              primaryLink: data.website
                ? { href: data.website, label: 'Website' }
                : undefined,
            },
          ]}
        />
      )}
    />
  </AlgoliaLayout>
);
