import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import PublicStack from '../PublicContainer/public_container';
import PrivateStack from '../PrivateContainer/private_container';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Public" component={PublicStack} />
      <Stack.Screen name="Private" component={PrivateStack} />
    </Stack.Navigator>
  );
}
