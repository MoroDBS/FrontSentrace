'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { devicesActions } from '@/src/store';
import { generateLoginToken } from '@/src/common/components/NativeInterface';
import fetchOrThrow from '@/src/common/util/fetchOrThrow';
import Loader from '@/src/common/components/Loader';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const hasQueryParams = ['locale', 'token', 'uniqueId', 'openid'].some(key => searchParams.has(key));

  useEffect(() => {
    const handleParams = async () => {
      if (!hasQueryParams) {
        router.replace('/');
        return;
      }

      if (searchParams.has('locale')) {
        const locale = searchParams.get('locale');
        if (locale) {
          localStorage.setItem('language', locale);
        }
      }

      if (searchParams.has('token')) {
        const token = searchParams.get('token');
        await fetch(`/api/session?token=${encodeURIComponent(token!)}`);
      }

      if (searchParams.has('uniqueId')) {
        const response = await fetchOrThrow(`/api/devices?uniqueId=${searchParams.get('uniqueId')}`);
        const items = await response.json();
        if (items.length > 0) {
          dispatch(devicesActions.selectId(items[0].id));
        }
      }

      if (searchParams.has('openid')) {
        if (searchParams.get('openid') === 'success') {
          generateLoginToken();
        }
      }

      router.replace('/');
    };

    handleParams();
  }, [hasQueryParams, searchParams, router, dispatch]);

  if (hasQueryParams) {
    return <Loader />;
  }

  router.replace('/');
  return <Loader />;
}

