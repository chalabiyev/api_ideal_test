import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const TelephoneModalIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(24)}
    height={height || vs(24)}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.313 20.76c2.533 1.09 5.567 1.74 9.187 1.74v-5.25l-5.25-1.313-3.938 4.824Zm0 0c-5.042-2.167-8.107-6.076-9.844-10.073m0 0C2.025 7.37 1.5 3.992 1.5 1.5h5.25l1.313 5.25-4.594 3.938Z"
    />
  </Svg>
);
