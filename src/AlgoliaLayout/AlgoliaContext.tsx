import React, { useContext } from 'react';
import useAlgolia from 'use-algolia';

export interface IAlgoliaContextProps {
  algoliaState: ReturnType<typeof useAlgolia>[0];
  requestDispatch: ReturnType<typeof useAlgolia>[1];
  getMore: ReturnType<typeof useAlgolia>[2];
  setAlgoliaConfig: ReturnType<typeof useAlgolia>[3];
  query: ReturnType<typeof useAlgolia>[4];

  isLoading: boolean;
  isLoadingMore: boolean;
  isFiltered: boolean;
  noResults: boolean;
  isEmpty: boolean;
}

const DEFAULT_STATE = {
  algoliaState: {},
  requestDispatch: () => {},
  getMore: () => {},
  setAlgoliaConfig: () => {},
  query: () => {},

  isLoading: false,
  isLoadingMore: false,
  isFiltered: false,
  noResults: false,
  isEmpty: false,
};

export const AlgoliaContext = React.createContext<IAlgoliaContextProps>(
  DEFAULT_STATE as any
);

export const useAlgoliaContext = () => useContext(AlgoliaContext);

export default useAlgoliaContext;
