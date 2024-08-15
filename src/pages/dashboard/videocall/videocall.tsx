import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { VideoCallView } from 'src/sections/videocall/view';

export default function VideoCallPage() {
  const metadata = { title: `Video Call | Dashboard - ${CONFIG.site.name}` };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <VideoCallView />
    </>
  );
}
