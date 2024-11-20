import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CreditCreateView } from 'src/sections/credits/view';

// ----------------------------------------------------------------------

const metadata = { title: `Kredit yarat | Dashboard - ${CONFIG.site.name}` };

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
