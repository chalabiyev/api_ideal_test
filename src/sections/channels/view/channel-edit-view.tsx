import type { IProductItem } from 'src/types/product';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ChannelNewEditForm } from '../channel-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  channel?: IProductItem;
};

export function ChannelEditView({ channel }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Channel', href: paths.dashboard.channels.root },
          { name: 'Edit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ChannelNewEditForm currentChannel={channel} />
    </DashboardContent>
  );
}
