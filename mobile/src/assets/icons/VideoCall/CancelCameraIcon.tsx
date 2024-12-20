import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const CancelCameraIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(36)}
    height={height || vs(36)}
    viewBox="0 0 36 36"
    fill="none"
  >
    <Path
      fill="#BFDBFF"
      fillRule="evenodd"
      d="M7.906 6c-1.379 0-2.701.587-3.676 1.632-.975 1.045-1.523 2.462-1.523 3.94v12.857c0 1.477.548 2.894 1.523 3.94C5.205 29.412 6.527 30 7.906 30h12c1.378 0 2.7-.587 3.676-1.632.975-1.045 1.523-2.462 1.523-3.94v-.534l5.212 3.857c1.856 1.371 4.39-.052 4.39-2.469V10.716c0-2.417-2.534-3.843-4.39-2.469l-5.212 3.86v-.536c0-1.477-.548-2.894-1.523-3.94C22.607 6.588 21.284 6 19.905 6H7.906Z"
      clipRule="evenodd"
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
