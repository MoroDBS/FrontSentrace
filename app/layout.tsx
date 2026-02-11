import React from 'react';
import Providers from '@/app/providers';

export const metadata = {
  title: 'Traccar',
  description: 'GPS Tracking',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1976d2" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
      </head>
      <body style={{ height: '100vh', display: 'flex', margin: 0 }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
