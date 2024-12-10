import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {s, vs} from 'react-native-size-matters';

export const DeleteIcon = ({width, height, color}: any) => (
  <Svg
    width={width || s(25)}
    height={height || vs(28)}
    viewBox="0 0 25 28"
    fill="none">
    <Path
      fill="#A76E6E"
      d="M6.143 21.778c0 .59.24 1.154.67 1.571.428.417 1.01.651 1.616.651h9.142a2.32 2.32 0 0 0 1.617-.65c.428-.418.67-.983.67-1.572V8.444H6.142v13.334Zm2.286-11.111h9.142v11.11H8.43v-11.11ZM17 5.11 15.857 4h-5.714L9 5.111H5v2.222h16V5.111h-4Z"
    />
  </Svg>
);
