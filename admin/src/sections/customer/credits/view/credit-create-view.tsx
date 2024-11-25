import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CreateCreditForm } from '../credit-new-edit-form';

// ----------------------------------------------------------------------

export function CreditCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new Credit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Credits', href: paths.dashboard.user.root },
          { name: 'New credit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CreateCreditForm />
    </DashboardContent>
  );
}
