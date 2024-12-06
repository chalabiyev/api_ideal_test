export type TextProps = {
  text: string;
  color?: string;
  type: 'semiBold' | 'bold' | 'regular';
  size: '8' | '10' | '12' | '14' | '16' | '18' | '20' | '24' | '36';
  position?: 'center' | 'left' | 'right';
  style?: object;
  marginVertical?: string | number;
  isWhite?: boolean;
  isBlue?: boolean;
  isGray?: boolean;
  numberOfLines?: number;
  underline?: boolean;
  isDisabled?: boolean;
};
