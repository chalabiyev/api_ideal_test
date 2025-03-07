import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// Import pages dynamically
const Statistika = lazy(() => import('src/pages/dashboard/Statistika'));
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
const EditPartnyor = lazy(() => import('src/pages/dashboard/Partnyorlar/EditPartnyor'));
const NewPartner = lazy(() => import('src/pages/dashboard/Partnyorlar/NewPartner'));
const Clients = lazy(() => import('src/pages/dashboard/Clients/Clients'));

// muraciet
const Muraciet = lazy(() => import('src/pages/dashboard/Muracietler/Muraciet'));

//  -------------------------------------   Veb saytın İDARƏ PANELİ   -------------------------------------
const Slayder = lazy(() => import('src/pages/dashboard/WebPanelPages/Slayder'));
const SlayderDuzelisEt = lazy(() => import('src/pages/dashboard/WebPanelPages/SlayderDuzelisEt'));
const SlayderElaveEt = lazy(() => import('src/pages/dashboard/WebPanelPages/SlayderElaveEt'));
const Haqqimizda = lazy(() => import('src/pages/dashboard/WebPanelPages/Haqqimizda'));
const Kreditler = lazy(() => import('src/pages/dashboard/WebPanelPages/Kreditler'));
const KreditElaveEt = lazy(() => import('src/pages/dashboard/WebPanelPages/KreditElaveEt'));
const KreditDuzelisEt = lazy(() => import('src/pages/dashboard/WebPanelPages/KreditDuzelisEt'));
const Sigortalar = lazy(() => import('src/pages/dashboard/WebPanelPages/Sigortalar'));
const SigortaElaveEt = lazy(() => import('src/pages/dashboard/WebPanelPages/SigortaElaveEt'));
const SigortaDuzelisEt = lazy(() => import('src/pages/dashboard/WebPanelPages/SigortaDuzelisEt'));
const HaqqimizdaPage = lazy(() => import('src/pages/dashboard/WebPanelPages/HaqqimizdaPage'));
const HaqqimizdaElaveEt = lazy(() => import('src/pages/dashboard/WebPanelPages/HaqqimizdaElaveEt'));
const HaqqimizdaDuzelisEt = lazy(
  () => import('src/pages/dashboard/WebPanelPages/HaqqimizdaDuzelisEt')
);
const Kampaniyalar = lazy(() => import('src/pages/dashboard/WebPanelPages/Kampaniyalar'));
const KampaniyaElaveEt = lazy(() => import('src/pages/dashboard/WebPanelPages/KampaniyaElaveEt'));
const KampaniyaDuzelisEt = lazy(
  () => import('src/pages/dashboard/WebPanelPages/KampaniyaDuzelisEt')
);
const Elaqe = lazy(() => import('src/pages/dashboard/WebPanelPages/Elaqe'));
const Abuneler = lazy(() => import('src/pages/dashboard/WebPanelPages/Abuneler'));

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
        path: 'muracietler',
        children: [{ path: 'muraciet', element: <Muraciet /> }],
      },
      {
        path: 'partynorlar',
        children: [
          { path: 'list', element: <PartnyorlarList /> },
          {
            path: 'yeni-partnyor',
            children: [{ path: 'create', element: <NewPartner /> }],
          },
          { path: 'duzeliset/:id', element: <EditPartnyor /> },
        ],
      },
      {
        path: 'musteriler',
        element: <Clients />,
      },

      //  -------------------------------------   Veb saytın İDARƏ PANELİ   -------------------------------------

      {
        path: 'webesassehife',
        children: [
          { path: 'slayder', element: <Slayder /> },
          { path: 'slayderduzeliset/:id', element: <SlayderDuzelisEt /> },
          { path: 'slayderelaveet', element: <SlayderElaveEt /> },
          { path: 'haqqimizda', element: <Haqqimizda /> },
        ],
      },
      {
        path: 'webkredit',
        children: [
          { path: 'kreditler', element: <Kreditler /> },
          { path: 'kreditelaveet', element: <KreditElaveEt /> },
          { path: 'kreditduzeliset/:id', element: <KreditDuzelisEt /> },
        ],
      },
      {
        path: 'websigorta',
        children: [
          { path: 'sigortalar', element: <Sigortalar /> },
          { path: 'sigortaelaveet', element: <SigortaElaveEt /> },
          { path: 'sigortaduzeliset/:id', element: <SigortaDuzelisEt /> },
        ],
      },
      {
        path: 'websirket',
        children: [
          { path: 'haqqimizda', element: <HaqqimizdaPage /> },
          { path: 'haqqimizdaelaveet', element: <HaqqimizdaElaveEt /> },
          { path: 'haqqimizdaduzeliset/:id', element: <HaqqimizdaDuzelisEt /> },
          { path: 'kampaniyalar', element: <Kampaniyalar /> },
          { path: 'kampaniyaelaveet', element: <KampaniyaElaveEt /> },
          { path: 'kampaniyaduzeliset/:id', element: <KampaniyaDuzelisEt /> },
        ],
      },
      {
        path: 'webelaqe',
        children: [{ path: 'elaqe', element: <Elaqe /> }],
      },
      {
        path: 'webabune',
        children: [{ path: 'abune', element: <Abuneler /> }],
      },
    ],
  },
];
