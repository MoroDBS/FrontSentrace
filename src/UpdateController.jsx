'use client';

import { useEffect, useState } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux';
import { useTranslation } from './common/components/LocalizationProvider';

// Service Worker Update Controller - compatible avec next-pwa
const UpdateController = () => {
  const t = useTranslation();
  const [needRefresh, setNeedRefresh] = useState(false);
  const [registration, setRegistration] = useState(null);

  const swUpdateInterval = useSelector((state) => state.session.server.attributes.serviceWorkerUpdateInterval || 3600000);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const registerAndListen = async () => {
      try {
        const reg = await navigator.serviceWorker.getRegistrations();
        if (reg.length > 0) {
          const swReg = reg[0];
          setRegistration(swReg);

          // Écouter les mises à jour
          swReg.addEventListener('updatefound', () => {
            const newWorker = swReg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Service worker mis à jour et prêt
                setNeedRefresh(true);
              }
            });
          });

          // Vérifier les mises à jour à intervalles réguliers
          if (swUpdateInterval > 0) {
            setInterval(async () => {
              try {
                if ('connection' in navigator && !navigator.onLine) {
                  return;
                }
                await swReg.update();
              } catch (e) {
                // Ignore update errors
              }
            }, swUpdateInterval);
          }
        }
      } catch (e) {
        // Ignore registration errors
      }
    };

    registerAndListen();
  }, [swUpdateInterval]);

  const handleRefresh = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      setNeedRefresh(false);
      // Reload page after skip waiting
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <Snackbar
      open={needRefresh}
      message={t('settingsUpdateAvailable')}
      action={(
        <IconButton color="inherit" onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      )}
    />
  );
};

export default UpdateController;
