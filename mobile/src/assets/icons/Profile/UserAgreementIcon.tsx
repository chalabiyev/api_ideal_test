import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const UserAgreementIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(25)}
    height={height || vs(28)}
    viewBox="0 0 25 28"
    fill="none">
    <Path
      stroke="#1B1B1B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.846 14V9.956A6.046 6.046 0 0 1 13 4a6.046 6.046 0 0 1 6.154 5.954V14m-3.077 8.076A3.076 3.076 0 0 0 19.154 19V15.54m-3.077 6.538A1.923 1.923 0 0 1 14.154 24h-2.308a1.923 1.923 0 1 1 0-3.846h2.308a1.923 1.923 0 0 1 1.923 1.923ZM4.538 11.693h1.539a.769.769 0 0 1 .77.77v4.614a.77.77 0 0 1-.77.77H4.538A1.539 1.539 0 0 1 3 16.307v-3.077a1.538 1.538 0 0 1 1.538-1.538Zm16.924 6.153h-1.539a.77.77 0 0 1-.77-.769v-4.615a.77.77 0 0 1 .77-.77h1.539A1.538 1.538 0 0 1 23 13.233v3.076a1.538 1.538 0 0 1-1.538 1.538Z"
    />
  </Svg>
);
