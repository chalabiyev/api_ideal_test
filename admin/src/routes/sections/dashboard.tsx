import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const VideoCallPage = lazy(() => import('src/pages/dashboard/videocall/videocall'));
// User
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// Customer
const FizikiCustomerListPage = lazy(() => import('src/pages/dashboard/customer/fiziki/list'));
const HuquqiCustomerListPage = lazy(() => import('src/pages/dashboard/customer/huquqi/list'));
const TeminatCustomerListPage = lazy(() => import('src/pages/dashboard/customer/teminat/list'));
const CovCustomerListPage = lazy(() => import('src/pages/dashboard/customer/covmusteri/list'));
const FerdiCustomerListPage = lazy(() => import('src/pages/dashboard/customer/ferdi/list'));
const CreateRequestPage = lazy(() => import('src/pages/dashboard/customer/request/new'));
// Test render page by role
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// Credit Page
const NewCreditPage = lazy(() => import('src/pages/dashboard/credits/new'));
const EditCreditPage = lazy(() => import('src/pages/dashboard/credits/edit'));
const CreditListPage = lazy(() => import('src/pages/dashboard/credits/list'));

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
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <VideoCallPage />, path: 'videocall' },
      { element: <IndexPage />, index: true },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'customer',
        children: [
          { element: <FizikiCustomerListPage />, index: true },
          { path: 'fiziki/list', element: <FizikiCustomerListPage /> },
          { path: 'ferdi/list', element: <FerdiCustomerListPage /> },
          { path: 'huquqi/list', element: <HuquqiCustomerListPage /> },
          { path: 'teminat/list', element: <TeminatCustomerListPage /> },
          { path: 'covmusteri/list', element: <CovCustomerListPage /> },
          { path: ':id/createrequest', element: <CreateRequestPage /> },
        ],
      },
      { path: 'permission', element: <PermissionDeniedPage /> },
      {
        path: 'credits',
        children: [
          { element: <NewCreditPage />, index: true },
          {
            path: 'list',
            element: <CreditListPage />,
          },
          {
            path: ':id/edit',
            element: <EditCreditPage />,
          },
          {
            path: 'new',
            element: <NewCreditPage />,
          },
        ],
      },
    ],
  },
];
