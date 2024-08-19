import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import {useGetChannel } from 'src/actions/channel';

import { ChannelEditView } from 'src/sections/channels/view';

// ----------------------------------------------------------------------

const metadata = { title: `Channel edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { channel } = useGetChannel(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ChannelEditView channel={channel} />
    </>
  );
}
