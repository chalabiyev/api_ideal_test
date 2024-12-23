import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { makeStyles } from "./style";
import { MainHeaderProps } from "./type";
import { BackArrow } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import Text from "../Text";
const styles = makeStyles();
export default function MainHeader(props: MainHeaderProps): JSX.Element {
  const { text } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerleft}
      >
        <BackArrow />
      </TouchableOpacity>
      <View style={styles.headerMid}>
        <Text text={text} type="semiBold" size="18" position="left" />
      </View>
    </View>
  );
}
