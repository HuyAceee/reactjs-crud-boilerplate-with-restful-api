import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DeleteBranding from './src/_dashboard.branding.$id.delete';
import * as EditBranding from './src/_dashboard.branding.$id.edit';
import * as ApiCreateBranding from './src/_dashboard.branding.api.create';
import * as CreateBranding from './src/_dashboard.branding.create';

const BrandingRoutes: RouteObject[] = [
  {
    path: '/branding',
    lazy: () => {
      return import('./src/_dashboard.branding._index').then(module => ({
        loader: module.loader,
        shouldRevalidate: module.shouldRevalidate,
        errorElement: <module.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <module.Page />
          </Suspense>
        ),
      }));
    },
  },
  {
    path: '/branding/defer',
    lazy: () => {
      return import('./src/_dashboard.branding.defer').then(module => ({
        loader: module.loader,
        shouldRevalidate: module.shouldRevalidate,
        errorElement: <module.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <module.Page />
          </Suspense>
        ),
      }));
    },
  },
  {
    path: '/branding/:id/edit',
    action: EditBranding.action,
    shouldRevalidate: EditBranding.shouldRevalidate,
    errorElement: <EditBranding.ErrorBoundary />,
  },
  {
    path: '/branding/create',
    action: CreateBranding.action,
    errorElement: <CreateBranding.ErrorBoundary />,
    element: <CreateBranding.Page />,
  },
  {
    path: '/branding/api/create',
    action: ApiCreateBranding.action,
    errorElement: <ApiCreateBranding.ErrorBoundary />,
  },
  {
    path: '/branding/:id/delete',
    action: DeleteBranding.action,
  },
];

export default BrandingRoutes;
