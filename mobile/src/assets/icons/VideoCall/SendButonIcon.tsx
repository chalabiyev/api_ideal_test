import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const SendButtonIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(22)}
    height={height || vs(25)}
    viewBox="0 0 22 25"
    fill="none"
  >
    <Path
      fill="#fff"
      d="M1.956.769C1.094.297.148 1.2.394 2.259l1.803 7.733c.045.195.14.37.27.503.131.134.294.22.467.249l8.842 1.45c.256.04.256.465 0 .508l-8.84 1.448a.849.849 0 0 0-.468.249 1.06 1.06 0 0 0-.27.503L.394 22.64c-.246 1.057.7 1.96 1.562 1.49l19.231-10.523c.85-.464.85-1.852 0-2.317L1.956.769Z"
    />
  </Svg>
);
