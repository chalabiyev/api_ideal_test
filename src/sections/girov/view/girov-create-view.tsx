import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { GirovNewEditForm } from '../girov-new-edit-form';

// ----------------------------------------------------------------------

export function GirovCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Yeni Girov yarat"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Girov', href: paths.dashboard.girov.root },
          { name: 'Yeni Girov' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <GirovNewEditForm />
    </DashboardContent>
  );
}
