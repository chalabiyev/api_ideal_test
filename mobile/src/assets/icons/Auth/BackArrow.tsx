import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const BackArrow = ({width, height, color}: any) => (
  <Svg
    width={width || s(14)}
    height={height || vs(26)}
    viewBox="0 0 14 26"
    fill="none">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 1 1 13l12 12"
    />
  </Svg>
);
