import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const PersonIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(19)}
    height={height || vs(22)}
    viewBox="0 0 19 22"
    fill="none">
    <Path
      stroke="#1B1B1B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 21v-1.428c0-3.158 2.536-5.715 5.667-5.715h5.666c3.131 0 5.667 2.557 5.667 5.715V21M9.5 9.571c-2.352 0-4.25-1.914-4.25-4.285C5.25 2.914 7.148 1 9.5 1c2.352 0 4.25 1.914 4.25 4.286 0 2.371-1.898 4.285-4.25 4.285Z"
    />
  </Svg>
);
