import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import colors from '../../../constants/colors/colors';
import {Unvisible, Visible} from '../../../assets';
import Text from '../Text';
import {InputProps} from './type';
const styles = makeStyles();
export default function Input(props: InputProps): JSX.Element {
  const {rightText, isRightText, secureTextEntry = false, ...restProps} = props;
  const [isSecure, setSecure] = useState<boolean>(secureTextEntry);

  const togglePasswordVisibility = () => {
    setSecure(prev => !prev);
    console.log('Password visibility toggled:', !isSecure);
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{paddingRight: 15}}>
          {isSecure ? <Visible /> : <Unvisible />}
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        autoComplete="off"
        placeholderTextColor={colors.greyText}
        style={styles.input}
        secureTextEntry={isSecure}
        {...restProps}
      />
      {getRightIcon()}
      {isRightText && <Text text={rightText} type="regular" size="14" isGray />}
    </View>
  );
}
