'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import BottomMenu from '@/src/common/components/BottomMenu';
import SocketController from '@/src/SocketController';
import CachingController from '@/src/CachingController';
import { useCatch, useEffectAsync } from '@/src/reactHelper';
import { sessionActions } from '@/src/store';
import UpdateController from '@/src/UpdateController';
import TermsDialog from '@/src/common/components/TermsDialog';
import Loader from '@/src/common/components/Loader';
import fetchOrThrow from '@/src/common/util/fetchOrThrow';

const useStyles = makeStyles()(() => ({
  page: {
    flexGrow: 1,
    overflow: 'auto',
  },
  menu: {
    zIndex: 4,
    '@media print': {
      display: 'none',
    },
  },
}));

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const newServer = useSelector((state: any) => state.session.server.newServer);
  const termsUrl = useSelector((state: any) => state.session.server.attributes.termsUrl);
  const user = useSelector((state: any) => state.session.user);

  const acceptTerms = useCatch(async () => {
    const response = await fetchOrThrow(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, attributes: { ...user.attributes, termsAccepted: true } }),
    });
    dispatch(sessionActions.updateUser(await response.json()));
  });

  useEffectAsync(async () => {
    if (!user) {
      const response = await fetch('/api/session');
      if (response.ok) {
        dispatch(sessionActions.updateUser(await response.json()));
      } else {
        const search = searchParams.toString();
        window.sessionStorage.setItem('postLogin', pathname + (search ? `?${search}` : ''));
        router.replace(newServer ? '/register' : '/login');
      }
    }
    return null;
  }, [user, pathname, searchParams, newServer, router, dispatch]);

  if (user == null) {
    return <Loader />;
  }
  
  if (termsUrl && !user.attributes.termsAccepted) {
    return (
      <TermsDialog
        open
        onCancel={() => router.push('/login')}
        onAccept={() => acceptTerms()}
      />
    );
  }

  return (
    <>
      <SocketController />
      <CachingController />
      <UpdateController />
      <div className={classes.page}>
        {children}
      </div>
      {!desktop && (
        <div className={classes.menu}>
          <BottomMenu />
        </div>
      )}
    </>
  );
}
