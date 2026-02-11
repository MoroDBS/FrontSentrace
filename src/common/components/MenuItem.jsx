import { makeStyles } from 'tss-react/mui';
import { ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import Link from 'next/link';

const useStyles = makeStyles()((theme) => ({
  menuItemText: {
    whiteSpace: 'nowrap',
  },
  menuItemButton: {
    borderRadius: theme.tokens?.borderRadius?.md || 6,
    margin: `${theme.tokens?.spacing ? theme.tokens.spacing(0.5) : theme.spacing(0.5)} ${theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1)}`,
    transition: theme.tokens?.transition?.base || 'all 200ms',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'transparent',
    border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
      fontWeight: 600,
      boxShadow: theme.palette.mode === 'light' ? (theme.tokens?.shadows?.xs || '0 1px 4px rgba(0,0,0,0.08)') : 'none',
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
    },
  },
  iconBox: {
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: theme.tokens?.borderRadius?.sm || 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light),
  },
}));

const MenuItem = ({ title, link, icon, selected }) => {
  const { classes } = useStyles();

  const content = (
    <>
      <ListItemIcon>
        <Box className={classes.iconBox}>
          {icon}
        </Box>
      </ListItemIcon>
      <ListItemText primary={title} className={classes.menuItemText} />
    </>
  );

  const isExternal = typeof link === 'string' && (link.startsWith('http://') || link.startsWith('https://'));

  if (isExternal) {
    return (
      <ListItemButton
        key={link}
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        selected={selected}
        className={classes.menuItemButton}
      >
        {content}
      </ListItemButton>
    );
  }

  return (
    <ListItemButton key={link} component={Link} to={link} selected={selected} className={classes.menuItemButton}>
      {content}
    </ListItemButton>
  );
};

export default MenuItem;
