import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import dimensions from './dimensions';
import componentOverrides from './components';
import tokens from './tokens';

export default (server, darkMode, direction) => useMemo(() => {
  const palInstance = palette(server, darkMode);
  
  return createTheme(
    {
      typography: {
        fontFamily: 'Roboto,Segoe UI,Helvetica Neue,Arial,sans-serif',
      },
      palette: palInstance,
      direction,
      dimensions,
      tokens,
    },
    {
      components: componentOverrides,
    },
  );
}, [server, darkMode, direction]);
