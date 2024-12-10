import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  Splash,
  Login,
  Register,
  Birthday,
  TelephoneNumber,
  Otp,
  Agreements,
  Password,
  ProfileInformations,
  BankInformations,
} from '../../screens';
import SimaSignature from '../../screens/Auth/SimaSignature';

export default function PublicStack() {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <Screen name="Splash" component={Splash} />
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
      <Screen name="TelephoneNumber" component={TelephoneNumber} />
      <Screen name="Birthday" component={Birthday} />
      <Screen name="Otp" component={Otp} />
      <Screen name="Agreements" component={Agreements} />
      <Screen name="SimaSignature" component={SimaSignature} />
      <Screen name="Password" component={Password} />
      <Screen name="ProfileInformations" component={ProfileInformations} />
      <Screen name="BankInformations" component={BankInformations} />
    </Navigator>
  );
}
