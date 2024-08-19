import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ChannelListView } from 'src/sections/channels/view';


// ----------------------------------------------------------------------

const metadata = { title: `Channel list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ChannelListView />
    </>
  );
}
