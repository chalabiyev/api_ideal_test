import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { makeStyles } from "./style";
import { FastCreditModalProps } from "./type";
import Modal from "react-native-modalbox";
import Text from "../../Fit/Text";
import MainButton from "../../Fit/Button";
import { globalSpacingStyle } from "../../../constants/space/style";
import { InputArrowIcon } from "../../../assets";
import colors from "../../../constants/colors/colors";

const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const reasons = ["Faiz", "Komissiya", "Kreditin müddəti", "Digər"];

export default function CreditFilterModal(
  props: FastCreditModalProps
): JSX.Element {
  const { setState, state } = props;
  return (
    <Modal
      useNativeDriver
      style={styles.modal}
      swipeToClose={true}
      isOpen={state}
      swipeThreshold={1}
      onClosed={() => setState && setState()}
      coverScreen={true}
      position={"bottom"}
    >
      <View style={styles.container}>
        <Text text="Filtre" type="bold" size="18" />
      </View>
    </Modal>
  );
}
