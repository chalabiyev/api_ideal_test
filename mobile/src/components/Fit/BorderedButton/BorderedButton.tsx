import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { makeStyles } from "./style";
import { MainButtonProps } from "./type";
import Text from "../Text";

export default function BorderedButton(props: MainButtonProps): JSX.Element {
  const { onPress, color, text } = props;
  const styles = makeStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => onPress()}
      style={[
        styles.container,
        typeof color === "string" ? { borderColor: color } : {},
      ]}
    >
      <Text
        text={text}
        type={"semiBold"}
        size={"16"}
        isDisabled
        style={typeof color === "string" ? { color: color } : {}}
      />
    </TouchableOpacity>
  );
}
