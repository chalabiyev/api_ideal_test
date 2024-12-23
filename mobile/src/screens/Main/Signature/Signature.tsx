import React from "react";
import { SafeAreaView, View, Dimensions, Image } from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { MainHeader, Text } from "../../../components";
import { scale } from "react-native-size-matters";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function Signature() {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <MainHeader text="Aktivləşdirmə" />
      <View style={styles.container}>
        <Image
          source={require("../../../assets/gif/signing.gif")}
          style={{
            width: scale(300),
            height: scale(300),
            marginLeft: 60,
            bottom: 100,
          }}
          resizeMode="contain"
        />

        <Text text="SIMA" type="semiBold" size="24" position="center" />
      </View>
    </>
  );
}
