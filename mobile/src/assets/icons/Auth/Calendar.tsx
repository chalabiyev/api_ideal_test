import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const Calendar = ({width, height, color}: any) => (
  <Svg
    width={width || s(24)}
    height={height || vs(24)}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      fill={color || '#637381'}
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm0 6H5v10h14V9ZM8.5 15a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1Zm4 0a1 1 0 0 1 .117 1.993L12.5 17h-1a1 1 0 0 1-.117-1.993L11.5 15h1Zm-4-4a1 1 0 0 1 .117 1.993L8.5 13h-1a1 1 0 0 1-.117-1.993L7.5 11h1Zm4 0a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1Zm4 0a1 1 0 0 1 .117 1.993L16.5 13h-1a1 1 0 0 1-.117-1.993L15.5 11h1ZM19 5H5v2h14V5Z"
    />
  </Svg>
);
