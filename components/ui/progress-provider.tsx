'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import { ReactNode } from 'react';

const ProgressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="hsl(var(--foreground))"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;