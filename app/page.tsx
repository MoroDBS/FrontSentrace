'use client';

import React from 'react';
import Navigation from '../src/Navigation';
import ErrorHandler from '../src/common/components/ErrorHandler';
import NativeInterface from '../src/common/components/NativeInterface';

export default function Page() {
  return (
    <>
      <Navigation />
      <ErrorHandler />
      <NativeInterface />
    </>
  );
}
