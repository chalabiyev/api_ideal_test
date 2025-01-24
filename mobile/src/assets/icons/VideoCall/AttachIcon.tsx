import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const AttachIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(15)}
    height={height || vs(26)}
    viewBox="0 0 15 26"
    fill="none"
  >
    <Path
      stroke="#8E8DAA"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={1.431}
      d="M4.717 9.179v9.557a2.72 2.72 0 0 0 .762 1.855 2.5 2.5 0 0 0 1.79.765 2.5 2.5 0 0 0 1.791-.765 2.72 2.72 0 0 0 .762-1.855L9.83 6.209c.007-.598-.1-1.19-.314-1.744a4.535 4.535 0 0 0-.934-1.483 4.322 4.322 0 0 0-1.41-.993 4.173 4.173 0 0 0-3.337 0 4.322 4.322 0 0 0-1.41.993c-.402.425-.72.929-.934 1.483a4.685 4.685 0 0 0-.315 1.744V18.82c-.011.84.137 1.676.438 2.456.3.78.747 1.491 1.312 2.09a6.077 6.077 0 0 0 1.985 1.4 5.865 5.865 0 0 0 4.696 0 6.077 6.077 0 0 0 1.984-1.4 6.377 6.377 0 0 0 1.313-2.09c.3-.78.45-1.615.438-2.456V7.035"
    />
  </Svg>
);
