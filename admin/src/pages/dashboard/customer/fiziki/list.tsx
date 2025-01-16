import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { FizikiCustomerListView } from 'src/sections/customer/fiziki/view/user-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `İstifadəçi siyahısı | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <FizikiCustomerListView />
    </>
  );
}
