import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const MicrofonIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(26)}
    height={height || vs(34)}
    viewBox="0 0 26 34"
    fill="none"
  >
    <Path
      fill="#BFDBFF"
      stroke="#BFDBFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 15.616a6.136 6.136 0 0 1-1.757 4.306A5.955 5.955 0 0 1 13 21.706a5.955 5.955 0 0 1-4.243-1.784A6.137 6.137 0 0 1 7 15.616V7.09c0-1.615.632-3.164 1.757-4.306A5.955 5.955 0 0 1 13 1c1.591 0 3.117.642 4.243 1.784A6.136 6.136 0 0 1 19 7.09v8.526Z"
    />
    <Path
      stroke="#BFDBFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M25 17a11.304 11.304 0 0 1-.817 4.242 11.079 11.079 0 0 1-2.34 3.596 10.767 10.767 0 0 1-3.507 2.401c-1.311.556-2.717.84-4.136.838h-2.4a10.541 10.541 0 0 1-4.137-.837 10.762 10.762 0 0 1-3.507-2.4 11.075 11.075 0 0 1-2.34-3.597A11.3 11.3 0 0 1 1 17m12 11.077V33"
    />
  </Svg>
);
