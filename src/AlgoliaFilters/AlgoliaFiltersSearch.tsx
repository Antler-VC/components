import React from 'react'

import {
  makeStyles,
  createStyles,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      boxShadow: theme.shadows[1],
    },

    input: {
      // '&, &:hover, &$focused': {
      // backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
      // },
    },

    inputFocused: {},
  })
)

export interface IAlgoliaFiltersSearchProps {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  handleQueryChange: (query: string) => void

  label: string
}

export default function AlgoliaFiltersSearch({
  query,
  setQuery,
  handleQueryChange,
  label,
}: IAlgoliaFiltersSearchProps) {
  const classes = useStyles()

  return (
    <TextField
      value={query}
      onChange={e => {
        setQuery(e.target.value)
        handleQueryChange(e.target.value)
      }}
      variant="filled"
      type="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        classes: {
          root: classes.input,
          // focused: classes.inputFocused
        },
      }}
      aria-label={`Search${label ? ' ' + label : ''}`}
      placeholder={`Search${label ? ' ' + label : ''}`}
      hiddenLabel
      fullWidth
      className={classes.root}
    />
  )
}
