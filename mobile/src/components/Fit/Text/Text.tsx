import React from 'react';
import {Text as NativeText, View} from 'react-native';
import {makeStyles} from './style';
import {TextProps} from './type';

export default function Text(props: TextProps) {
  const {
    color,
    text,
    type,
    size,
    position,
    style,
    marginVertical,
    isBlue,
    isWhite,
    isGray,
    numberOfLines,
    underline,
    isDisabled,
  } = props;
  const styles = makeStyles({
    isBlue: isBlue ?? false,
    isGray: isGray ?? false,
    isWhite: isWhite ?? false,
    isDisabled: isDisabled ?? false,
  });

  return (
    <View style={[styles.container, {marginVertical: marginVertical}]}>
      <NativeText
        numberOfLines={numberOfLines}
        style={[
          type === 'semiBold' ? styles.semiBold : {},
          type === 'bold' ? styles.bold : {},
          type === 'regular' ? styles.regular : {},
          size === '8' ? styles.size8 : {},
          size === '10' ? styles.size10 : {},
          size === '12' ? styles.size12 : {},
          size === '14' ? styles.size14 : {},
          size === '16' ? styles.size16 : {},
          size === '18' ? styles.size18 : {},
          size === '20' ? styles.size20 : {},
          size === '24' ? styles.size24 : {},
          size === '36' ? styles.size36 : {},
          position === 'center' ? styles.center : {},
          position === 'left' ? styles.left : {},
          position === 'right' ? styles.right : {},
          style ?? {},
          typeof color === 'string' ? {color: color} : {},
          underline ? styles.underline : {},
          style ?? {},
        ]}>
        {`${text}`}
      </NativeText>
    </View>
  );
}
