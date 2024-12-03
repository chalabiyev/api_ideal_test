import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const NotficationIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(18)}
    height={height || vs(20)}
    viewBox="0 0 18 20"
    fill="none">
    <Path
      fill="#000"
      d="M3 7.985a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 15 7.985v6l3 2v1H0v-1l3-2v-6Zm8 10a2 2 0 1 1-4 0h4Z"
    />
  </Svg>
);
