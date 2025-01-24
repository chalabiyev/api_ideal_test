import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const InputArrowIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(18)}
    height={height || vs(18)}
    viewBox="0 0 20 20"
    fill="none"
  >
    <Path
      fill="#7D7D7D"
      d="M16.16 5.955a1.125 1.125 0 0 0-1.59 0L9 11.523 3.432 5.955a1.125 1.125 0 0 0-1.591 1.59l6.364 6.364a1.125 1.125 0 0 0 1.59 0l6.365-6.364a1.125 1.125 0 0 0 0-1.59Z"
    />
  </Svg>
);
