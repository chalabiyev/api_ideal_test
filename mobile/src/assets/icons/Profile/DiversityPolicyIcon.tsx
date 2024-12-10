import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const DiversityPolicyIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(25)}
    height={height || vs(28)}
    viewBox="0 0 25 28"
    fill="none">
    <Path
      fill="#1B1B1B"
      stroke="#1B1B1B"
      strokeWidth={0.2}
      d="m17 24-1.711-.76a3.944 3.944 0 0 1-1.666-1.385A3.595 3.595 0 0 1 13 19.85V15h8v4.851a3.595 3.595 0 0 1-.623 2.005c-.405.6-.982 1.08-1.666 1.385L17 24Zm-2.4-7.5v3.351c.001.426.13.843.374 1.202.243.36.59.648 1 .83L17 22.34l1.026-.456c.41-.183.757-.47 1-.83s.373-.777.374-1.203V16.5h-4.8Z"
    />
    <Path
      fill="#1B1B1B"
      stroke="#1B1B1B"
      strokeWidth={0.2}
      d="M6.771 2.9c-.53 0-.977.182-1.335.544-.358.362-.536.815-.536 1.35v16.412c0 .536.178.989.535 1.35.358.363.805.544 1.335.544h5.201V21.789H6.77a.535.535 0 0 1-.392-.184.56.56 0 0 1-.182-.4V4.795c0-.14.056-.272.181-.4a.545.545 0 0 1 .394-.183h7.993V8.656H19.148V10.984H20.444V7.96l-.028-.03-4.933-5-.029-.029H6.772Z"
    />
  </Svg>
);
