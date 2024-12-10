import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {makeStyles} from './style';
import {Button, Container, Input, MainHeader, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {useNavigation} from '@react-navigation/native';

const globalStyle = globalSpacingStyle();
const styles = makeStyles();

export default function Password() {
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const navigation = useNavigation();

  const isButtonDisabled = !password || !rePassword || password !== rePassword;

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <View style={globalStyle.space30VT} />
        <Text text="Şifrə yaradın" type="regular" size="20" position="center" />
        <View style={globalStyle.space30VT} />
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <Container>
            <View style={{alignItems: 'center'}}>
              <Input
                placeholder="Şifrə"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={true}
              />
              <Input
                placeholder="Şifrəni təsdiqləyin"
                value={rePassword}
                onChangeText={setRePassword}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={true}
              />
            </View>
          </Container>
          <View style={{alignItems: 'center'}}>
            <Button
              text="Davam et"
              disable={isButtonDisabled}
              onPress={() => navigation.navigate('Login')}
            />
            <View style={globalStyle.space30VT} />
          </View>
        </View>
      </View>
    </>
  );
}
