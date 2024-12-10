import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const Check = ({width, height, color}: any) => (
  <Svg
    width={width || s(9)}
    height={height || vs(7)}
    viewBox="0 0 9 7"
    fill="none">
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m3.865 6.245 4.75-4.75c.34-.34.34-.89 0-1.24a.881.881 0 0 0-1.24 0l-4.13 4.13-1.75-1.75a.881.881 0 0 0-1.24 0c-.34.34-.34.89 0 1.24l2.38 2.37c.17.17.39.25.61.25.23 0 .45-.08.62-.25Z"
      clipRule="evenodd"
    />
  </Svg>
);
