import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const DeletePin = ({ width, height, color }: any) => (
  <Svg
    width={width || s(43)}
    height={height || vs(30)}
    viewBox="0 0 43 30"
    fill="none"
  >
    <Path
      fill="#414141"
      d="M11.756 2.062A5.5 5.5 0 0 1 15.596.5H36.19c1.196 0 2.588.332 3.726 1.038 1.158.716 2.22 1.948 2.22 3.712v19.5c0 1.764-1.062 2.994-2.22 3.712A7.3 7.3 0 0 1 36.19 29.5H15.596a5.5 5.5 0 0 1-3.84-1.562l-10.7-10.432a3.5 3.5 0 0 1 0-5.012l10.7-10.432ZM25.06 9.94a1.501 1.501 0 1 0-2.12 2.12L25.88 15l-2.94 2.94a1.5 1.5 0 1 0 2.12 2.12L28 17.12l2.94 2.94a1.5 1.5 0 1 0 2.12-2.12L30.12 15l2.94-2.94a1.5 1.5 0 1 0-2.12-2.12L28 12.88l-2.94-2.94Z"
    />
  </Svg>
);
