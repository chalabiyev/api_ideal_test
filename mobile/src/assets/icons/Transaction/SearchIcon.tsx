import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const SearchIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(24)}
    height={height || vs(24)}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      stroke="#123566"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m23 23-5.308-5.308m0 0A9.777 9.777 0 1 0 3.866 3.865a9.777 9.777 0 0 0 13.826 13.827Z"
    />
  </Svg>
);
