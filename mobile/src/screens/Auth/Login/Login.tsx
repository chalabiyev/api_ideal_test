import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {
  Container,
  Input,
  MainHeader,
  PhoneInput,
  Text,
} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import MainButton from '../../../components/Fit/Button/MainButton';
import {useNavigation} from '@react-navigation/native';

const styles = makeStyles();
const globalStyle = globalSpacingStyle();
export default function Login() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const isButtonDisabled = !phoneNumber || !password;

  const handleButtonPress = () => {
    if (!isButtonDisabled) {
      navigation.navigate('Private', {screen: 'Home'});
    }
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <Text text="Daxil olun" type="regular" size="20" position="center" />
        <View style={globalStyle.space20VT} />
        <Text
          text="Hesabınıza daxil olun"
          type="regular"
          size="14"
          position="center"
          isGray
        />
        <Container>
          <PhoneInput
            placeholder="Telefon nömrə"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />

          <Input
            placeholder="Şifrə"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            keyboardType="default"
            secureTextEntry={true}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Text
              text="Şifrəni unutdum"
              type="regular"
              size="14"
              position="left"
              isBlue
            />
          </TouchableOpacity>
          <View style={globalStyle.space30VT} />
        </Container>
        <View style={{alignItems: 'center'}}>
          <MainButton
            text="Daxil ol"
            onPress={handleButtonPress}
            disable={isButtonDisabled}
          />
          <View style={globalStyle.space20VT} />
          <Text text="VƏ YA" type="regular" size="16" />
          <View style={globalStyle.space20VT} />
          <MainButton
            text="Digital Login"
            disable
            onPress={() => {}}
            color="#1C252E"
          />
        </View>
      </View>
    </>
  );
}
