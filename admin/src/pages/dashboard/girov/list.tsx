import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { GirovListView } from 'src/sections/girov/view';

// ----------------------------------------------------------------------

const metadata = { title: `Girov list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <GirovListView />
    </>
  );
}
