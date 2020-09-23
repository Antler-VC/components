import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme =>
  createStyles({
    root: { width: '100%', height: '100%' },
    container: { height: '100%' },

    cardContentContainer: {
      // height: '100%',
      '&:last-child': { paddingBottom: theme.spacing(3) },
    },
    cardContent: {
      '&:last-child': { paddingBottom: 0 },
    },

    headerContainer: {},
    tabsContainer: { '$headerContainer + &': { marginTop: theme.spacing(2) } },
    contentContainer: {
      // height: '100%',
      '$headerContainer + &': { marginTop: theme.spacing(2) },
    },

    overline: {
      marginBottom: theme.spacing(0.5),
      display: 'block',

      color: theme.palette.text.disabled,
      wordBreak: 'break-word',
      whiteSpace: 'pre-line',
    },
    title: {
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: theme.shape.borderRadius,
    },
    imageCircle: { borderRadius: '50%' },

    tabs: { margin: theme.spacing(0, -2) },
    tab: { minWidth: 0 },
    tabDivider: { marginTop: -1 },

    tabSection: { paddingTop: theme.spacing(2), height: '100%' },
    tabContentGrid: { height: `calc(100% + ${theme.spacing(3)}px)` },

    divider: {
      margin: theme.spacing(2),
      marginBottom: 0,
    },
    cardActions: {
      padding: theme.spacing(0.75, 1),
      display: 'flex',
      justifyContent: 'space-between',
    },

    primaryLinkLabel: { whiteSpace: 'nowrap' },
  })
)

export default useStyles
