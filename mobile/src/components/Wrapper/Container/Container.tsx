import React from "react";
import { View } from "react-native";
import { makeStyles } from "./style";

type ContainerProps = {
  children: React.ReactNode;
};
const styles = makeStyles();

export default function Container(props: ContainerProps): JSX.Element {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
}
