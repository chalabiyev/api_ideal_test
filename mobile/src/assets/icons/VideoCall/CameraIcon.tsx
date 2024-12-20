import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const CameraIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(32)}
    height={height || vs(24)}
    viewBox="0 0 32 24"
    fill="none"
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M5.2 0C3.82 0 2.497.587 1.522 1.632.548 2.677 0 4.094 0 5.572v12.857c0 1.477.548 2.894 1.523 3.94C2.498 23.412 3.82 24 5.199 24h12c1.378 0 2.7-.587 3.676-1.632.975-1.045 1.523-2.462 1.523-3.94v-.534l5.212 3.857c1.856 1.371 4.39-.052 4.39-2.469V4.716c0-2.417-2.534-3.843-4.39-2.469l-5.212 3.86V5.57c0-1.477-.548-2.894-1.523-3.94C19.9.588 18.577 0 17.198 0H5.2Z"
      clipRule="evenodd"
    />
  </Svg>
);
