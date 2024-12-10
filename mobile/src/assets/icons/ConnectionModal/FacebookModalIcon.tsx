import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const FacebookModalIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(24)}
    height={height || vs(24)}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      fill="#fff"
      d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
    />
  </Svg>
);
