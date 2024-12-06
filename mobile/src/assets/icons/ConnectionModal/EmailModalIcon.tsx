import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const EmailModalIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(26)}
    height={height || vs(23)}
    viewBox="0 0 26 23"
    fill="none">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6.438 7.438 4.921 4.218c.466.4 1.045.617 1.641.617.596 0 1.175-.217 1.64-.617l4.922-4.219m5.25 11.25V4.626c0-.746-.276-1.461-.768-1.989a2.54 2.54 0 0 0-1.857-.824H3.813a2.54 2.54 0 0 0-1.856.824 2.918 2.918 0 0 0-.768 1.989v14.063c0 .745.276 1.46.768 1.988a2.54 2.54 0 0 0 1.857.824h18.375a2.54 2.54 0 0 0 1.856-.824 2.918 2.918 0 0 0 .768-1.988Z"
    />
  </Svg>
);
