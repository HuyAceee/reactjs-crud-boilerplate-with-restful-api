import { Suspense } from 'react';
import { Outlet } from '~/overrides/remix';

export const AuthLayout = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
