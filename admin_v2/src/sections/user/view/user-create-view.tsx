import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../user-new-edit-form';

// ----------------------------------------------------------------------

export function UserCreateView() {
  return (
    <DashboardContent>
     

      <UserNewEditForm />
    </DashboardContent>
  );
}
