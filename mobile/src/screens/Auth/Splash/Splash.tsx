import React, { useRef } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import MainButton from "../../../components/Fit/Button/MainButton";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../components";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width: viewportWidth } = Dimensions.get("window");
export default function Splash() {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.splashBackground }} />
      <View style={styles.container}>
        <View style={globalStyle.space20VT} />
        <Text
          text="Sürətli nağd pul krediti"
          type="semiBold"
          size="24"
          position="center"
          isWhite
        />
        <View style={globalStyle.space10VT} />
        <Text
          text="24/7 kredit əldə etmək imkanı"
          type="regular"
          size="16"
          position="center"
          color="#95BEEF"
        />
        <View style={globalStyle.space10VT} />
        <Image
          source={require("../../../assets/images/SplashImages/Card.png")}
        />
        <View style={globalStyle.space20VT} />
        <MainButton
          text="Daxil ol"
          onPress={() => navigation.navigate("Login")}
        />
        <View style={globalStyle.space10VT} />
        <MainButton
          text="Qeydiyyatdan keç"
          onPress={() => navigation.navigate("Register")}
          color={colors.defaultButtonSkyBlue}
        />
      </View>
    </>
  );
}
