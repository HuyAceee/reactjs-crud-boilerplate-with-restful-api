import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DashboardLayout from './src/_dashboard';
import * as Dashboard from './src/_dashboard.dashboard';
import BrandingRoutes from './src/BrandingRoutes';

export const DashboardRoutes: RouteObject[] = [
  {
    element: <DashboardLayout.Page />,
    loader: DashboardLayout.loader,
    errorElement: <DashboardLayout.ErrorBoundary />,
    children: [
      {
        path: '/dashboard',
        errorElement: <Dashboard.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <Dashboard.Page />
          </Suspense>
        ),
      },
      ...BrandingRoutes,
    ],
  },
];
