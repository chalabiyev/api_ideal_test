import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { makeStyles } from "./style";
import { BackArrow } from "../../../assets";
import { WebsocketContextType, SignalType } from "./type";
import { useNavigation } from "@react-navigation/native";
import Text from "../Text";
const styles = makeStyles();
export default function WebCam(): JSX.Element {
  const navigation = useNavigation();
  return <View style={styles.container}></View>;
}
