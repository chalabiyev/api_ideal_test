import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, TouchableOpacity } from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { MainHeader, Text } from "../../../components";
import { StarIcon } from "../../../assets";
import MainButton from "../../../components/Fit/Button";
import { useNavigation } from "@react-navigation/native";
const styles = makeStyles();
const { width } = Dimensions.get("window");
const globalStyle = globalSpacingStyle();
const navigation = useNavigation();
export default function Activation() {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />

      <View style={styles.container}>
        <Text
          text="Aktivləşdir"
          type="regular"
          size="16"
          position="left"
          isWhite
        />
      </View>
    </>
  );
}
