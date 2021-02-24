import React from 'react';

import {
  makeStyles,
  createStyles,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { boxShadow: theme.shadows[1] },
    input: { boxShadow: 'none' },
  })
);

export interface IAlgoliaSearchFieldProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQueryChange: (query: string) => void;

  label: string;
}

export default function AlgoliaSearchField({
  query,
  setQuery,
  handleQueryChange,
  label,
}: IAlgoliaSearchFieldProps) {
  const classes = useStyles();

  return (
    <TextField
      value={query}
      onChange={e => {
        setQuery(e.target.value);
        handleQueryChange(e.target.value);
      }}
      variant="filled"
      type="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        classes: { root: classes.input },
      }}
      aria-label={`Search${label ? ' ' + label : ''}`}
      placeholder={`Search${label ? ' ' + label : ''}`}
      hiddenLabel
      fullWidth
      className={classes.root}
    />
  );
}
