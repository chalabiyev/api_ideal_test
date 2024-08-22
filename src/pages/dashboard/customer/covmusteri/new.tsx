import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserCreateView } from 'src/sections/customer/cov/view/user-create-view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new user | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserCreateView />
    </>
  );
}
