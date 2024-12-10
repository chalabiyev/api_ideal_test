import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const VideoRequestIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(30)}
    height={height || vs(20)}
    viewBox="0 0 30 20"
    fill="none">
    <Path
      stroke="#D84558"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m20.385 8 6.777-6.293c.15-.14.343-.235.551-.274.209-.038.425-.018.622.057.197.076.365.204.483.368a.95.95 0 0 1 .182.555v15.174a.95.95 0 0 1-.182.555 1.064 1.064 0 0 1-.483.368 1.155 1.155 0 0 1-.622.057 1.105 1.105 0 0 1-.55-.274L20.384 12M4.23 19h12.923c.857 0 1.678-.316 2.284-.879A2.896 2.896 0 0 0 20.385 16V4c0-.796-.34-1.559-.947-2.121A3.36 3.36 0 0 0 17.154 1H4.23c-.857 0-1.679.316-2.285.879A2.896 2.896 0 0 0 1 4v12c0 .796.34 1.559.946 2.121A3.361 3.361 0 0 0 4.231 19Z"
    />
  </Svg>
);
