import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import WebCamTestView from './view';


export default function VideoCallPage() {
  const metadata = { title: `Webcam Test | Dashboard - ${CONFIG.site.name}` };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <WebCamTestView />
    </>
  );
}
