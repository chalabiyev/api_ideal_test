import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';

import { ChannelDetailsView } from 'src/sections/channels/view';

// ----------------------------------------------------------------------

const metadata = { title: `Channel details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ChannelDetailsView channel={product} loading={productLoading} error={productError} />
    </>
  );
}
