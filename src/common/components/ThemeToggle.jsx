import { IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  button: {
    borderRadius: theme.tokens?.borderRadius?.lg || 8,
    transition: theme.tokens?.transition?.fast || 'all 150ms',
  },
}));

const ThemeToggle = ({ darkMode, onToggle }) => {
  const { classes } = useStyles();

  return (
    <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'} arrow>
      <IconButton
        onClick={onToggle}
        className={classes.button}
        color="inherit"
      >
        {darkMode ? (
          <LightModeIcon />
        ) : (
          <DarkModeIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
