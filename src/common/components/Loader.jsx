import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import tokens from '../theme/tokens';

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loader = document.querySelector('.loader');
    if (loader) loader.style.display = 'none';
    return () => {
      if (loader) loader.style.display = 'none';
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent', pointerEvents: 'none', zIndex: 1300,
      }}
      aria-live="polite"
      aria-busy="true"
      suppressHydrationWarning
    >
      {mounted && <CircularProgress size={tokens.spinnerSize} />}
    </Box>
  );
};

export default Loader;
