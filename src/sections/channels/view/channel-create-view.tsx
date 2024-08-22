import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ChannelNewEditForm } from '../channel-new-edit-form';

// ----------------------------------------------------------------------

export function ChannelCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new Channel"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Mənbələr', href: paths.dashboard.channels.root },
          { name: 'Yeni mənbə' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ChannelNewEditForm />
    </DashboardContent>
  );
}
