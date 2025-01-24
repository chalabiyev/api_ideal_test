import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const ShareIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(26)}
    height={height || vs(6)}
    viewBox="0 0 26 6"
    fill="none"
  >
    <Circle cx={3} cy={3} r={2.5} fill="#fff" />
    <Circle cx={13} cy={3} r={2.5} fill="#fff" />
    <Circle cx={23} cy={3} r={2.5} fill="#fff" />
  </Svg>
);
