import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  AccountSettings,
  Calculator,
  Credits,
  CreditsInfo,
  Home,
  Insurance,
  InsuranceInfo,
  Partners,
  Profile,
  Transaction,
  VideoCall,
} from "../../screens";

export default function PrivateStack() {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Transaction" component={Transaction} />
      <Screen name="Partners" component={Partners} />
      <Screen name="Credits" component={Credits} />
      <Screen name="CreditsInfo" component={CreditsInfo} />
      <Screen name="Insurance" component={Insurance} />
      <Screen name="InsuranceInfo" component={InsuranceInfo} />
      <Screen name="Calculator" component={Calculator} />
      <Screen name="Profile" component={Profile} />
      <Screen name="AccountSettings" component={AccountSettings} />
      <Screen name="VideoCall" component={VideoCall} />
    </Navigator>
  );
}
