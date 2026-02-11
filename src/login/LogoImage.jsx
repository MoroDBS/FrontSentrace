import { useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import Logo from '../resources/images/logo.svg?react';

const useStyles = makeStyles()((theme) => ({
  image: {
    alignSelf: 'center',
    maxWidth: '240px',
    maxHeight: '120px',
    width: 'auto',
    height: 'auto',
    margin: theme.spacing(2),
  },
}));

const LogoImage = ({ color }) => {
  const theme = useTheme();
  const { classes } = useStyles();

  const expanded = !useMediaQuery(theme.breakpoints.down('lg'));

  const logo = useSelector((state) => state.session.server.attributes?.logo);
  const logoInverted = useSelector((state) => state.session.server.attributes?.logoInverted);

  const resolveLogoUrl = (it) => {
    if (!it) return null;
    if (typeof it === 'string') return it;
    if (it && typeof it === 'object') {
      return it.url || it.path || it.src || it.default || null;
    }
    return null;
  };

  const logoUrl = resolveLogoUrl(logo);
  const logoInvertedUrl = resolveLogoUrl(logoInverted);

  if (logoUrl) {
    if (expanded && logoInvertedUrl) {
      return <img className={classes.image} src={logoInvertedUrl} alt="" />;
    }
    return <img className={classes.image} src={logoUrl} alt="" />;
  }
  return <Logo className={classes.image} style={{ color }} />;
};

export default LogoImage;
