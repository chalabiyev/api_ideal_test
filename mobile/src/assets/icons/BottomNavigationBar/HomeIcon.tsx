import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const HomeIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(20)}
    height={height || vs(20)}
    viewBox="0 0 20 20"
    fill="none">
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M11.727 2.367c-.223-.223-.511-.334-.867-.334s-.644.111-.867.334L1.66 10.7a.449.449 0 0 0-.2.4.64.64 0 0 0 .2.467.64.64 0 0 0 .467.2.449.449 0 0 0 .4-.2l8.333-8.334 8.333 8.334c.09.133.223.2.4.2a.64.64 0 0 0 .467-.2.64.64 0 0 0 .2-.467.449.449 0 0 0-.2-.4l-2.933-2.933V3.633a.64.64 0 0 0-.2-.466.64.64 0 0 0-.467-.2h-1.2a.64.64 0 0 0-.467.2.64.64 0 0 0-.2.466v1.6l-2.866-2.866Zm-.867 2.266 7.533 7.467v5.267c0 .533-.189.977-.566 1.333a1.923 1.923 0 0 1-1.367.533H5.26c-.533 0-.989-.177-1.367-.533a1.755 1.755 0 0 1-.566-1.333V12.1l7.533-7.467Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.86 20.5h20V.5h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
);
