import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CovCustomerListView } from 'src/sections/customer/cov/view/user-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CovCustomerListView />
    </>
  );
}
