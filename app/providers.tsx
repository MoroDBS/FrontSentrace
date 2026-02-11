'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import store from '../src/store';
import ErrorBoundary from '../src/ErrorBoundary';
import ServerProvider from '../src/ServerProvider';
import { LocalizationProvider } from '../src/common/components/LocalizationProvider';
import AppThemeProvider from '../src/AppThemeProvider';
import ErrorHandler from '../src/common/components/ErrorHandler';
import NativeInterface from '../src/common/components/NativeInterface';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const origFetch = window.fetch.bind(window);
      const origImageDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');

      // Wrap fetch to detect non-string resource argument
      // and send debug info to server for analysis (dev only).
      if (process.env.NODE_ENV !== 'production') {
        window.fetch = function (resource, init) {
          try {
            if (resource && typeof resource === 'object') {
              const debugInfo = {
                type: 'fetch',
                resource: String(resource),
                stack: new Error().stack,
              };
              origFetch('/api/client-debug', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(debugInfo),
              }).catch(() => {});
              // Prevent fetch with non-string URL
              return Promise.reject(new TypeError(`fetch() expects a string URL as first argument, received: ${typeof resource}`));
            }
          } catch (e) {
            // ignore
          }
          return origFetch(resource, init);
        };

        if (origImageDesc && origImageDesc.set) {
          const origSet = origImageDesc.set;
          Object.defineProperty(HTMLImageElement.prototype, 'src', {
            set(value) {
              try {
                if (value && typeof value !== 'string') {
                  origFetch('/api/client-debug', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'image-src', value: String(value) }),
                  }).catch(() => {});
                }
              } catch (e) {
                // ignore
              }
              origSet.call(this, value);
            },
            configurable: true,
          });
        }
      }
    } catch (e) {
      // ignore debug instrumentation failures
    }
    // Report global errors from client to server when running on localhost
    try {
      if (typeof window !== 'undefined' && window.location && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        const sendReport = (payload) => {
          try {
            navigator.sendBeacon && typeof navigator.sendBeacon === 'function'
              ? navigator.sendBeacon('/api/client-debug', JSON.stringify(payload))
              : fetch('/api/client-debug', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
          } catch (e) {
            // ignore
          }
        };

        const onErr = (event) => {
          try {
            const payload = { type: 'error', message: event.message, filename: event.filename, lineno: event.lineno, colno: event.colno, error: (event.error && event.error.stack) || null };
            sendReport(payload);
          } catch (e) {
            // Ignore errors in error reporting
          }
        };

        const onRejection = (event) => {
          try {
            const reason = event.reason || event.detail || null;
            const payload = { type: 'unhandledrejection', reason: typeof reason === 'object' ? JSON.stringify(reason) : String(reason) };
            sendReport(payload);
          } catch (e) {
            // Ignore errors in error reporting
          }
        };

        window.addEventListener('error', onErr);
        window.addEventListener('unhandledrejection', onRejection);

        return () => {
          window.removeEventListener('error', onErr);
          window.removeEventListener('unhandledrejection', onRejection);
        };
      }
    } catch (e) {
      // ignore
    }
    return undefined;
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ServerProvider>
          <LocalizationProvider>
            <AppThemeProvider>
              <CssBaseline />
              {children}
              <ErrorHandler />
              <NativeInterface />
            </AppThemeProvider>
          </LocalizationProvider>
        </ServerProvider>
      </ErrorBoundary>
    </Provider>
  );
}
