import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const ArrowUp = ({width, height, color}: any) => (
  <Svg
    width={width || s(20)}
    height={height || vs(20)}
    viewBox="0 0 20 20"
    fill="none">
    <Path
      fill="#637381"
      d="M10 7.082c.194 0 .383.068.533.192l5 4.167a.834.834 0 1 1-1.067 1.283L10 8.991l-4.467 3.6a.833.833 0 0 1-1.175-.125.833.833 0 0 1 .117-1.217l5-4.025A.833.833 0 0 1 10 7.082Z"
    />
  </Svg>
);
