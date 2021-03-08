import React from 'react';
import _findIndex from 'lodash/findIndex';

import { useAlgoliaContext } from './AlgoliaContext';
import { IDetailsModalProps } from '../../Modal/DetailsModal';

export interface IAlgoliaLayoutModalProps extends Record<string, any> {
  objectID: string;
  setObjectID: (objectID: string, data: Record<string, any>) => void;

  Component: any;
  onClose: IDetailsModalProps['onClose'];
}

export default function AlgoliaLayoutModal({
  objectID = '',
  setObjectID,
  Component,
  onClose,
  ...props
}: IAlgoliaLayoutModalProps) {
  const { algoliaState } = useAlgoliaContext();

  if (!Component || !objectID) return null;

  const index = _findIndex(algoliaState.hits, ['objectID', objectID]);
  const data = algoliaState.hits[index];

  return (
    <Component
      onPrev={() => {
        const hit = algoliaState.hits[index - 1];
        if (hit) setObjectID(hit.objectID, hit);
      }}
      onNext={() => {
        const hit = algoliaState.hits[index + 1];
        if (hit) setObjectID(hit.objectID, hit);
      }}
      hasPrev={index > 0}
      hasNext={index < algoliaState.hits.length - 1}
      onClose={onClose}
      id={objectID}
      data={data}
      {...props}
    />
  );
}
