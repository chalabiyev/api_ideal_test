import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {MainHeaderProps} from './type';
import {BackArrow} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
const styles = makeStyles();
export default function MainHeader(props: MainHeaderProps): JSX.Element {
  const {onPress, color, text, disable} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerleft}>
        <BackArrow />
      </TouchableOpacity>
    </View>
  );
}
