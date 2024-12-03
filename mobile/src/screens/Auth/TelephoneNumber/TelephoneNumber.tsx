import React, {useState} from 'react';
import {Keyboard, SafeAreaView, View} from 'react-native';
import {makeStyles} from './style';
import {
  Button,
  Container,
  MainHeader,
  PhoneInput,
  Text,
} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {useNavigation} from '@react-navigation/native';

const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function TelephoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const isPhoneNumberValid = phoneNumber.length === 17;

  const handleContinue = () => {
    if (isPhoneNumberValid) {
      navigation.navigate('Otp');
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View onTouchStart={() => Keyboard.dismiss()} style={styles.container}>
        <View style={globalStyle.space30VT} />
        <View style={styles.box}>
          <View>
            <View style={styles.topAndBot}>
              <Text
                text="Mobil nömrənizi daxil edin"
                type="regular"
                size="20"
              />
              <View style={globalStyle.space20VT} />
              <Text
                text="Mobil nömrənizi daxil edin və sizə OTP kodu göndəriləcək."
                type="regular"
                size="12"
                isGray
              />
            </View>
            <Container>
              <PhoneInput
                placeholder="Mobil nömrə"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
              />
            </Container>
          </View>
          <View style={styles.topAndBot}>
            <Button
              text="Davam et"
              disable={!isPhoneNumberValid}
              onPress={handleContinue}
            />
            <View style={globalStyle.space30VT} />
          </View>
        </View>
      </View>
    </>
  );
}
