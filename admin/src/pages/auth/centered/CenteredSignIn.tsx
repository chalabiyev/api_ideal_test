import { Helmet } from 'react-helmet-async';

import { CenteredSignInView } from './CenteredSignInView';

const metaData = {
  title: `Sign in`,
};

export default function CenteredSignIn() {
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
      </Helmet>

      <CenteredSignInView />
    </>
  );
}
