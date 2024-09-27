import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';

import { GirovEditView } from 'src/sections/girov/view';

// ----------------------------------------------------------------------

const metadata = { title: `Girov edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { product } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <GirovEditView product={product} />
    </>
  );
}
