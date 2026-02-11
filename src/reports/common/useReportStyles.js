import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  containerMap: {
    flexBasis: '40%',
    flexShrink: 0,
  },
  containerMain: {
    overflow: 'auto',
  },
  header: {
    position: 'sticky',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  columnAction: {
    width: '1%',
    paddingLeft: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
    '@media print': {
      display: 'none',
    },
  },
  columnActionContainer: {
    display: 'flex',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(0.5) : theme.spacing(0.5),
  },
  filter: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    padding: theme.tokens?.spacing ? `${theme.tokens.spacing(3)} ${theme.tokens.spacing(2)} ${theme.tokens.spacing(2)}` : theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.tokens?.borderRadius?.lg || 8,
    '@media print': {
      display: 'none !important',
    },
  },
  filterItem: {
    minWidth: 0,
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
  },
  filterButtons: {
    display: 'flex',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
  },
  filterButton: {
    flexGrow: 1,
    borderRadius: theme.tokens?.borderRadius?.lg || 8,
  },
  chart: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  actionCellPadding: {
    '&.MuiTableCell-body': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '@media print': {
      display: 'none',
    },
  },
}));
