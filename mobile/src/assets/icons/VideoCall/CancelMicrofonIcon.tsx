import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const CancelMicrofonIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(36)}
    height={height || vs(36)}
    viewBox="0 0 36 36"
    fill="none"
  >
    <Path
      stroke="#BFDBFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M30.707 18a11.304 11.304 0 0 1-.817 4.242 11.08 11.08 0 0 1-2.34 3.596 10.767 10.767 0 0 1-3.507 2.401c-1.312.556-2.717.84-4.136.838h-2.4a10.541 10.541 0 0 1-4.137-.837 10.761 10.761 0 0 1-3.507-2.4 11.075 11.075 0 0 1-2.34-3.597A11.3 11.3 0 0 1 6.706 18m12 11.077V34"
    />
    <Path
      fill="#BFDBFF"
      stroke="#BFDBFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24.707 16.616a6.136 6.136 0 0 1-1.758 4.306 5.955 5.955 0 0 1-4.242 1.784 5.955 5.955 0 0 1-4.243-1.784 6.136 6.136 0 0 1-1.757-4.306V8.09c0-1.615.632-3.164 1.757-4.306A5.955 5.955 0 0 1 18.707 2c1.59 0 3.117.642 4.242 1.784a6.136 6.136 0 0 1 1.758 4.306v8.526Z"
    />
    <Rect
      width={45.5}
      height={3.5}
      x={3.41}
      y={0.939}
      fill="#BFDBFF"
      stroke="#1D7BF5"
      strokeWidth={1.5}
      rx={1.75}
      transform="rotate(44.906 3.41 .94)"
    />
  </Svg>
);
