import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const ExitIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(25)}
    height={height || vs(28)}
    viewBox="0 0 25 28"
    fill="none">
    <Path
      fill="#4E4E4E"
      d="M5 14a1 1 0 0 0 1 1h7.59l-2.3 2.29a1.002 1.002 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219l4-4a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76 1 1 0 0 0-.21-.33l-4-4a1.003 1.003 0 1 0-1.42 1.42l2.3 2.29H6a1 1 0 0 0-1 1ZM18 4H8a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-3a1 1 0 1 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z"
    />
  </Svg>
);
