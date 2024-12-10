import React from 'react';
import {makeStyles} from './style';
import colors from '../../../constants/colors/colors';
import {TextInputMask} from 'react-native-masked-text';
const styles = makeStyles();
export default function PhoneInput(props: any): JSX.Element {
  return (
    <TextInputMask
      style={styles.input}
      placeholderTextColor={colors.greyText}
      type={'custom'}
      options={{
        mask: '+994 99 999 99 99',
      }}
      keyboardType="numeric"
      {...props}
    />
  );
}
