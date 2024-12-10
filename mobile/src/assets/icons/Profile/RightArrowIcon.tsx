import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const RightArrowIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(6)}
    height={height || vs(12)}
    viewBox="0 0 6 12"
    fill="none">
    <Path
      stroke="#1B1B1B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m1 1 4 5-4 5"
    />
  </Svg>
);
