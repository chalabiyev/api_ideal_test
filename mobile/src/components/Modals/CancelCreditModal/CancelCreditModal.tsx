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

export default function CancelCreditModal(
  props: FastCreditModalProps
): JSX.Element {
  const { setState, state } = props;
  const [currentView, setCurrentView] = useState<"initial" | "selectReason">(
    "initial"
  );
  const [isReasonListVisible, setIsReasonListVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState<string>("");

  const handleCloseModal = () => {
    setState(false);
    setCurrentView("initial");
    setIsReasonListVisible(false);
    setSelectedReason(null);
    setCustomReason("");
  };

  const handleShowReasonSelection = () => {
    setCurrentView("selectReason");
  };

  const handleGoBack = () => {
    setCurrentView("initial");
    setIsReasonListVisible(false);
    setSelectedReason(null);
    setCustomReason("");
  };

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setIsReasonListVisible(false);
    if (reason !== "Digər") {
      handleCloseModal();
    }
  };

  return (
    <Modal
      useNativeDriver
      style={styles.modal}
      swipeToClose={true}
      isOpen={state}
      swipeThreshold={1}
      onClosed={handleCloseModal}
      coverScreen={true}
      position={"center"}
    >
      <View style={styles.container}>
        {currentView === "initial" ? (
          <>
            <Text
              text="İmtina etmək üçün əminsinizmi?"
              type="semiBold"
              size="18"
            />
            <View style={globalStyle.space20VT} />
            <MainButton onPress={handleCloseModal} text="Xeyr" />
            <View style={globalStyle.space20VT} />
            <TouchableOpacity onPress={handleShowReasonSelection}>
              <Text text="Bəli" type="regular" size="16" isBlue />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text text="İmtina səbəbini seçin" type="semiBold" size="18" />
            <View style={globalStyle.space20VT} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsReasonListVisible(!isReasonListVisible)}
              style={styles.sectionInput}
            >
              <Text
                text={selectedReason || "Səbəb seçin"}
                type="regular"
                size="14"
              />
              <InputArrowIcon />
            </TouchableOpacity>
            {isReasonListVisible && (
              <View style={styles.sectionList}>
                {reasons.map((reason, index) => (
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => handleReasonSelect(reason)}
                  >
                    <Text text={reason} type="regular" size="16" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedReason === "Digər" && (
              <>
                <View style={globalStyle.space20VT} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Şikayətinizi yazın"
                  placeholderTextColor={colors.greyText}
                  value={customReason}
                  onChangeText={setCustomReason}
                  multiline
                />
                <View style={globalStyle.space20VT} />
                <MainButton
                  onPress={() => {
                    console.log("Şikayət:", customReason);
                    handleCloseModal();
                  }}
                  text="Göndər"
                />
              </>
            )}

            <View style={globalStyle.space20VT} />
            <TouchableOpacity onPress={handleGoBack}>
              <Text text="Geri" type="regular" size="14" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
}
