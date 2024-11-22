import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CreateCreditForm } from '../credit-new-edit-form';

// ----------------------------------------------------------------------

export function CreditCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Yeni kredit yarat"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Kreditlər', href: paths.dashboard.credits.root },
          { name: 'Yeni Kredit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CreateCreditForm />
    </DashboardContent>
  );
}
