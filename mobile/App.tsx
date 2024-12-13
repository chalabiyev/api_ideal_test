import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./src/constants/colors/colors";
import MainStack from "./src/navigation/MainStack/MainStack";
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.backgroundColor}
        barStyle="light-content"
      />
      <MainStack />
    </NavigationContainer>
  );
}
export default App;
