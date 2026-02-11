import {
  AppBar, Toolbar, Typography, IconButton, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ setOpenDrawer, title }) => {
  const theme = useTheme();
  return (
    <AppBar position="sticky" color="inherit" sx={{ height: theme.tokens?.toolbarHeight || 64 }}>
      <Toolbar sx={{ minHeight: '100%' }}>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
