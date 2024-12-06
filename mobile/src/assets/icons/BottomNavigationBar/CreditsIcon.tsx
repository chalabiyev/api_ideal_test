import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const CreditsIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(19)}
    height={height || vs(19)}
    viewBox="0 0 19 19"
    fill="none">
    <G clipPath="url(#a)">
      <Path
        fill="#1F1F1F"
        d="M13.89.61c.52-.12.99-.01 1.41.33.42.34.65.77.69 1.29v1.38h.54c.48 0 .88.17 1.2.51.32.34.48.73.48 1.17v10.14c0 .48-.16.88-.48 1.2-.32.32-.72.48-1.2.48H1.89c-.48 0-.88-.16-1.2-.48-.32-.32-.48-.72-.48-1.2V5.29c0-.44.16-.82.48-1.14.32-.32.7-.5 1.14-.54l12.06-3Zm-7.44 3h8.4V2.23c0-.16-.07-.3-.21-.42-.14-.12-.31-.16-.51-.12L6.45 3.61ZM1.89 4.75c-.16 0-.29.05-.39.15-.1.1-.15.23-.15.39v10.14c0 .16.05.29.15.39.1.1.23.15.39.15h14.64c.16 0 .29-.05.39-.15.1-.1.15-.23.15-.39V5.29c0-.16-.05-.29-.15-.39-.1-.1-.23-.15-.39-.15H1.89Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.21 18.25h18v-18h-18z" />
      </ClipPath>
    </Defs>
  </Svg>
);
