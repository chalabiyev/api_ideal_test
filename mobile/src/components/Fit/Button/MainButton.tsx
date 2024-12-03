import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {MainButtonProps} from './type';
import Text from '../Text';

export default function MainButton(props: MainButtonProps): JSX.Element {
  const {onPress, color, text, disable} = props;
  const [isPressed, setIsPressed] = useState(false);
  const styles = makeStyles(isPressed);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => onPress()}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disable ?? false}
      style={[
        styles.container,
        disable ? styles.disabled : {},
        typeof color === 'string' ? {backgroundColor: color} : {},
      ]}>
      {disable ? (
        <Text
          text={text}
          type={'semiBold'}
          size={'16'}
          isDisabled
          style={{color: 'white'}}
        />
      ) : (
        <Text
          text={text}
          type={'semiBold'}
          size={'16'}
          style={{color: 'white'}}
        />
      )}
    </TouchableOpacity>
  );
}
