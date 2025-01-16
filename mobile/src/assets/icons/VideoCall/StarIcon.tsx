import React from "react";
import Svg, { Path } from "react-native-svg";
import { s, vs } from "react-native-size-matters";

export const StarIcon = ({ width, height, color }: any) => (
  <Svg
    width={width || s(52)}
    height={height || vs(49)}
    viewBox="0 0 52 49"
    fill="none"
  >
    <Path
      fill={color}
      d="M24.098 1.854c.599-1.843 3.205-1.843 3.804 0l4.609 14.184a2 2 0 0 0 1.902 1.383h14.914c1.938 0 2.743 2.479 1.176 3.617l-12.066 8.767a2 2 0 0 0-.727 2.236l4.61 14.184c.598 1.843-1.511 3.375-3.078 2.236l-12.066-8.766a2 2 0 0 0-2.352 0l-12.066 8.767c-1.567 1.138-3.676-.394-3.077-2.237l4.609-14.184a2 2 0 0 0-.727-2.236L1.497 21.038C-.07 19.9.735 17.421 2.673 17.421h14.914a2 2 0 0 0 1.902-1.383l4.609-14.184Z"
    />
  </Svg>
);
