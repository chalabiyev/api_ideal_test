import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { VideoCallTab } from '../videocalltab';

// ----------------------------------------------------------------------

export function VideoCallView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="VIdeo Call"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Video Zəng', href: paths.dashboard.videoCall },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <VideoCallTab />
    </DashboardContent>
  );
}
