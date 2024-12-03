import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const FilterIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(26)}
    height={height || vs(24)}
    viewBox="0 0 26 24"
    fill="none">
    <Path
      stroke="#123566"
      strokeLinecap="round"
      strokeWidth={2}
      d="M3.561 11.976V1M21.49 22.952v-4.116M3.561 22.952v-5.488m17.928-4.116V1m-8.964 4.116V1m0 21.952V10.604M3.561 17.464c1.415 0 2.561-1.228 2.561-2.744 0-1.515-1.146-2.744-2.56-2.744C2.146 11.976 1 13.205 1 14.72c0 1.516 1.147 2.744 2.561 2.744ZM12.525 10.604c1.414 0 2.561-1.228 2.561-2.744 0-1.515-1.147-2.744-2.561-2.744-1.415 0-2.561 1.229-2.561 2.744 0 1.516 1.146 2.744 2.56 2.744ZM21.49 18.836c1.414 0 2.56-1.228 2.56-2.744 0-1.515-1.146-2.744-2.56-2.744-1.415 0-2.562 1.229-2.562 2.744 0 1.516 1.147 2.744 2.561 2.744Z"
    />
  </Svg>
);
