import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const AddUserIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(32)}
    height={height || vs(32)}
    viewBox="0 0 32 32"
    fill="none"
  >
    <Path
      fill="#ffff"
      d="M16.786 30.36a9.574 9.574 0 0 1-2.706-6.68c0-2.16.714-4.156 1.92-5.76H3.84A3.84 3.84 0 0 0 0 21.76v.915c0 4.76 5.388 8.045 12.8 8.045a21.76 21.76 0 0 0 3.986-.36ZM20.48 7.68a7.68 7.68 0 1 0-15.36 0 7.68 7.68 0 0 0 15.36 0ZM23.68 32a8.32 8.32 0 1 0 0-16.64 8.32 8.32 0 0 0 0 16.64Zm0-14.08a.64.64 0 0 1 .64.64v4.48h4.48a.64.64 0 1 1 0 1.28h-4.48v4.48a.64.64 0 1 1-1.28 0v-4.48h-4.48a.64.64 0 1 1 0-1.28h4.48v-4.48a.64.64 0 0 1 .64-.64Z"
    />
  </Svg>
);
