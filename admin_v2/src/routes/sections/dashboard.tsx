import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';
import AllPartners from 'src/pages/dashboard/Partnyorlar/AllPartners';

// ----------------------------------------------------------------------

// Import pages dynamically
const Statistika = lazy(() => import('src/pages/dashboard/Statistika'));
const KreditYarat = lazy(() => import('src/pages/dashboard/KreditYarat'));
const VideoCall = lazy(() => import('src/pages/dashboard/VideoCall'));

// Video müraciət pages
const NagdPulKrediti = lazy(() => import('src/pages/dashboard/VideoMuraciet/NagdPulKrediti'));
const PartnyorluqKrediti = lazy(
  () => import('src/pages/dashboard/VideoMuraciet/PartnyorluqKrediti')
);
const BiznesKrediti = lazy(() => import('src/pages/dashboard/VideoMuraciet/BiznesKrediti'));
const Melumat = lazy(() => import('src/pages/dashboard/VideoMuraciet/Melumat'));

// Fiziki müraciət pages
const FizikiNagdpulKrediti = lazy(
  () => import('src/pages/dashboard/FizikiMuraciet/NagdPulKrediti')
);
const FizikiPartnyorluqKrediti = lazy(
  () => import('src/pages/dashboard/FizikiMuraciet/PartnyorluqKrediti')
);
const LombardKrediti = lazy(() => import('src/pages/dashboard/FizikiMuraciet/LombardKrediti'));
const Avtolizinq = lazy(() => import('src/pages/dashboard/FizikiMuraciet/Avtolizinq'));
const IpotekaKrediti = lazy(() => import('src/pages/dashboard/FizikiMuraciet/IpotekaKrediti'));
const FizikiBiznesKrediti = lazy(() => import('src/pages/dashboard/FizikiMuraciet/BiznesKrediti'));
const FizikiAvtokredit = lazy(() => import('src/pages/dashboard/FizikiMuraciet/Avtokredit'));
const FizikiMelumat = lazy(() => import('src/pages/dashboard/FizikiMuraciet/Melumat'));

// parners
const PartnyorlarList = lazy(() => import('src/pages/dashboard/Partnyorlar/AllPartners'));
const Fiziki = lazy(() => import('src/pages/dashboard/Partnyorlar/Fiziki'));
const Huquqi = lazy(() => import('src/pages/dashboard/Partnyorlar/Huquqi'));

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
      {
        path: 'videomuraciet',
        children: [
          { path: 'nagd-pul-krediti', element: <NagdPulKrediti /> },
          { path: 'partnyorluq-krediti', element: <PartnyorluqKrediti /> },
          { path: 'biznes-krediti', element: <BiznesKrediti /> },
          { path: 'melumat', element: <Melumat /> },
        ],
      },
      {
        path: 'fizikimuraciet',
        children: [
          { path: 'nagd-pul-krediti', element: <FizikiNagdpulKrediti /> },
          { path: 'partnyorluq-krediti', element: <FizikiPartnyorluqKrediti /> },
          { path: 'lombard-krediti', element: <LombardKrediti /> },
          { path: 'avtolizinq-krediti', element: <Avtolizinq /> },
          { path: 'ipoteka-krediti', element: <IpotekaKrediti /> },
          { path: 'biznes-krediti', element: <FizikiBiznesKrediti /> },
          { path: 'avto-kredit', element: <FizikiAvtokredit /> },
          { path: 'melumat', element: <FizikiMelumat /> },
        ],
      },
      {
        path: 'videocall',
        children: [{ path: 'videocall', element: <VideoCall />, openInNewTab: true }],
      },
      {
        path: 'partynorlar',
        children: [
          { path: 'list', element: <PartnyorlarList /> },
          {
            path: 'yeni-partnyor',
            children: [
              { path: 'fiziki', element: <Fiziki /> },
              { path: 'huquqi', element: <Huquqi /> },
            ],
          },
        ],
      },
    ],
  },
];
