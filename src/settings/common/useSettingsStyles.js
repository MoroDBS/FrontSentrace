import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
  table: {
    marginBottom: theme.tokens?.spacing ? theme.tokens.spacing(10) : theme.spacing(10),
    '& thead': {
      backgroundColor: theme.palette.action.hover,
    },
    '& tbody tr': {
      transition: theme.tokens?.transition?.base || 'all 200ms',
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        boxShadow: theme.tokens?.shadows?.xs || 'none',
      },
    },
  },
  columnAction: {
    width: '1%',
    paddingRight: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
  },
  container: {
    marginTop: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
  },
  buttons: {
    marginTop: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    marginBottom: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
    '& > *': {
      flexBasis: '33%',
      borderRadius: theme.tokens?.borderRadius?.lg || 8,
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    paddingBottom: theme.tokens?.spacing ? theme.tokens.spacing(3) : theme.spacing(3),
  },
  detailsCard: {
    borderRadius: theme.tokens?.borderRadius?.lg || 8,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.tokens?.shadows?.sm || 'none',
  },
  verticalActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
  },
  searchHeader: {
    display: 'flex',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1),
    marginBottom: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    padding: theme.tokens?.spacing ? theme.tokens.spacing(2) : theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.tokens?.borderRadius?.lg || 8,
  },
}));
