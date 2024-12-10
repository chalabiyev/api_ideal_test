import React from "react";
import { SafeAreaView, View, Dimensions } from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function VideoCall() {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.greyBackground }} />
      <View style={styles.container}></View>
    </>
  );
}
