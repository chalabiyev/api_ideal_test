import React from "react";
import { SafeAreaView, View, Dimensions } from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { MainHeader, Text } from "../../../components";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function Signature() {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <MainHeader />
      <View style={styles.container}>
        <Text text="Signature" type="semiBold" size="20" position="center" />
      </View>
    </>
  );
}
