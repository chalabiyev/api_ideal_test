import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// statistika
const Statistika = lazy(() => import('src/pages/dashboard/Statistika'));

// kredit
const KreditYarat = lazy(() => import('src/pages/dashboard/KreditYarat'));
// kredit
const VideoCall = lazy(() => import('src/pages/dashboard/VideoCall'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'esassehife',
        children: [{ path: 'statistika', element: <Statistika /> }],
      },
    ],
  },
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'kredit',
        children: [{ path: 'yarat', element: <KreditYarat /> }],
      },
    ],
  },
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'videocall',
        children: [{ path: 'videocall', element: <VideoCall />, openInNewTab: true }],
      },
    ],
  },
];
