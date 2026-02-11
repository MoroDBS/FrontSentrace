import { Fragment } from 'react';
import {
  List, ListItemText, ListItemIcon, Divider, ListSubheader, ListItemButton, useTheme, makeStyles,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const useStyles = makeStyles()((theme) => ({
  navItemButton: {
    margin: `${theme.tokens?.spacing ? theme.tokens.spacing(0.5) : theme.spacing(0.5)} ${theme.tokens?.spacing ? theme.tokens.spacing(1) : theme.spacing(1)}`,
    borderRadius: theme.tokens?.borderRadius?.md || 6,
    transition: theme.tokens?.transition?.base || 'all 200ms',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
    },
  },
}));

const SideNav = ({ routes }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const { classes } = useStyles();

  return (
    <List disablePadding style={{ paddingTop: theme.tokens?.spacing ? theme.tokens.spacing(2) : '16px' }}>
      {routes.map((route) => (route.subheader ? (
        <Fragment key={route.subheader}>
          <Divider />
          <ListSubheader>{route.subheader}</ListSubheader>
        </Fragment>
      ) : (
        <ListItemButton
          disableRipple
          component={Link}
          key={route.href}
          to={route.href}
          selected={pathname.match(route.match || route.href) !== null}
          className={classes.navItemButton}
        >
          <ListItemIcon>{route.icon}</ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItemButton>
      )))}
    </List>
  );
};

export default SideNav;
