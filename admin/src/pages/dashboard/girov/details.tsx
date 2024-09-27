import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetGirov } from 'src/actions/girov';

import { GirovDetailsView } from 'src/sections/girov/view';

// ----------------------------------------------------------------------

const metadata = { title: `Girov details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const { girov, girovLoading, girovError } = useGetGirov(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <GirovDetailsView girov={girov} loading={girovLoading} error={girovError} />
    </>
  );
}
