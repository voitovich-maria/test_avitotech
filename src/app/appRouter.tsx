import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PATHS, Preloader } from '@/shared';

const App = lazy(() => import('@/app/App'));
const AdvertisementsPage = lazy(() => import('@/pages/AdvertisementsPage'));
const AdvertisementDetailsPage = lazy(() => import('@/pages/AdvertisementDetailsPage'));
const OrdersPage = lazy(() => import('@/pages/OrdersPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: '/',
          element: <Navigate to={PATHS.advertisements.list} replace />,
        },
        {
          path: PATHS.advertisements.list,
          element: (
            <Suspense fallback={<Preloader />}>
              <AdvertisementsPage />
            </Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: PATHS.advertisements.details,
          element: (
            <Suspense fallback={<Preloader />}>
              <AdvertisementDetailsPage />
            </Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: PATHS.orders,
          element: (
            <Suspense fallback={<Preloader />}>
              <OrdersPage />
            </Suspense>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: '/*',
          element: <ErrorPage />,
        },
      ],
    },
  ]);
