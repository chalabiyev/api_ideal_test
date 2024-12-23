import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import {
  BorderedButton,
  CancelCreditModal,
  MainHeader,
  Text,
} from "../../../components";
import MainButton from "../../../components/Fit/Button";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

export default function ActivationBelow() {
  const styles = makeStyles();
  const { width } = Dimensions.get("window");
  const globalStyle = globalSpacingStyle();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState(4000);
  const [creditMounth, setCreditMounth] = useState(1);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <MainHeader text="Aktivləşdir" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={globalStyle.space20VT} />
          <View style={styles.topContainer}>
            <View
              style={[styles.box, { backgroundColor: colors.defaultdButton }]}
            >
              <Text text="1" type="regular" size="20" position="left" isWhite />
            </View>
            <View style={styles.dvider} />
            <View style={[styles.box, { backgroundColor: colors.greyText }]}>
              <Text text="2" type="regular" size="20" position="left" isWhite />
            </View>
            <View style={styles.dvider} />
            <View style={[styles.box, { backgroundColor: colors.greyText }]}>
              <Text text="3" type="regular" size="20" position="left" isWhite />
            </View>
          </View>
          <View style={globalStyle.space10VT} />
          <View style={styles.boxText}>
            <Text
              text="   Məlumatlar"
              type="regular"
              size="10"
              position="left"
            />
            <Text text="  Müqavilə" type="regular" size="10" position="left" />
            <Text
              text="SİMA QR imza"
              type="regular"
              size="10"
              position="left"
            />
          </View>
          <View style={globalStyle.space20VT} />
          <View style={styles.calculatorContainer}>
            <Text text="Kreditin məbləği:" type="regular" size="16" isGray />
            <View style={globalStyle.space3VT} />
            <Text text={creditAmount + " ₼"} type="regular" size="18" />
            <View style={globalStyle.space10VT} />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text text="10" type="regular" size="16" isGray />
              <Text text="500" type="regular" size="16" isGray />
            </View>
            <View style={globalStyle.space10VT} />
            <Slider
              minimumValue={100}
              maximumValue={500}
              step={10}
              value={creditAmount}
              onValueChange={(value) => setCreditAmount(value)}
              minimumTrackTintColor={colors.defaultdButton}
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor={colors.defaultdButton}
            />
            <View style={globalStyle.space20VT} />
            <Text
              text="Kreditin müddəti (aylarla):"
              type="regular"
              size="16"
              isGray
            />
            <View style={globalStyle.space3VT} />
            <Text text={creditMounth} type="regular" size="18" />
            <View style={globalStyle.space10VT} />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text text="1" type="regular" size="16" isGray />
              <Text text="36" type="regular" size="16" isGray />
            </View>
            <View style={globalStyle.space10VT} />
            <Slider
              minimumValue={1}
              maximumValue={36}
              step={1}
              value={creditMounth}
              onValueChange={(value) => setCreditMounth(value)}
              minimumTrackTintColor={colors.defaultdButton}
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor={colors.defaultdButton}
            />
          </View>
          <View style={globalStyle.space30VT} />
          <MainButton
            onPress={() => navigation.navigate("ActivationBelowStep2")}
            text="Təsdiqlə"
          />
          <View style={globalStyle.space20VT} />
        </ScrollView>
      </View>
      <CancelCreditModal state={isModalOpen} setState={setIsModalOpen} />
    </>
  );
}
