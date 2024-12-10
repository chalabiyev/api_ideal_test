import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { HuquqiCustomerListView } from 'src/sections/customer/huquqi/view';

// ----------------------------------------------------------------------

const metadata = { title: `İstifadəçi siyahısı | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HuquqiCustomerListView />
    </>
  );
}
