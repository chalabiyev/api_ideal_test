import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView, TouchableOpacity} from 'react-native';
import {makeStyles} from './style';
import {BottomNavigationContainer, Container, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {
  ChangePasswordIcon,
  RightArrowIcon,
  TelephoneIcon,
} from '../../../assets';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function AccountSettings() {
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.greyBackground}} />
      <View style={styles.container}>
        <Text text="Hesab" type="semiBold" size="20" position="center" />
        <View style={globalStyle.space30VT} />
        <TouchableOpacity style={styles.box}>
          <View style={styles.left}>
            <ChangePasswordIcon />
            <Text text={'    ' + 'Şifrəni dəyiş'} type="regular" size="16" />
          </View>
          <View style={styles.right}>
            <RightArrowIcon />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <View style={styles.left}>
            <TelephoneIcon />
            <Text
              text={'    ' + 'Mobil nömrəni dəyiş'}
              type="regular"
              size="16"
            />
          </View>
          <View style={styles.right}>
            <RightArrowIcon />
          </View>
        </TouchableOpacity>

        <BottomNavigationContainer />
      </View>
    </>
  );
}
