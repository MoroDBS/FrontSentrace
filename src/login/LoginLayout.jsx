import { useMediaQuery, Paper, Box, Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import LogoImage from './LogoImage';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    background: theme.palette.background.default,
  },
  sidebar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.tokens?.spacing ? theme.tokens.spacing(4) : theme.spacing(4),
    width: theme.tokens?.drawer?.widthDesktop || theme.dimensions.sidebarWidth,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('lg')]: {
      width: theme.tokens?.drawer?.widthTablet || theme.dimensions.sidebarWidthTablet,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  paperWrap: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '100%',
    maxWidth: 480,
    borderRadius: theme.tokens?.borderRadius?.lg || 8,
    padding: theme.tokens?.spacing ? theme.tokens.spacing(6) : theme.spacing(6),
    boxShadow: theme.tokens?.shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    margin: theme.tokens?.spacing ? theme.tokens.spacing(3) : theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.tokens?.spacing ? theme.tokens.spacing(3) : theme.spacing(3),
  },
}));

const LoginLayout = ({ children }) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const showSidebar = !useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <main className={classes.root}>
      {showSidebar && (
        <aside className={classes.sidebar}>
          <LogoImage color={theme.palette.primary.contrastText} />
        </aside>
      )}
      <div className={classes.paperWrap}>
        <Container>
          <Paper className={classes.paper} elevation={6}>
            <form className={classes.form}>
              {children}
            </form>
          </Paper>
        </Container>
      </div>
    </main>
  );
};

export default LoginLayout;
