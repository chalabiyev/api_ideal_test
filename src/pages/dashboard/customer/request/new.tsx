import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CreditCreateView } from 'src/sections/request/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new Credit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CreditCreateView />
    </>
  );
}
