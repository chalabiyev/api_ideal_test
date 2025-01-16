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

export default function ActivationAbove() {
  const styles = makeStyles();
  const { width } = Dimensions.get("window");
  const globalStyle = globalSpacingStyle();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <View style={globalStyle.space10HR} />
            <View style={styles.dvider}></View>
            <View style={globalStyle.space10HR} />
            <View style={[styles.box, { backgroundColor: colors.greyText }]}>
              <Text text="2" type="regular" size="20" position="left" isWhite />
            </View>
          </View>
          <View style={globalStyle.space10VT} />
          <View style={styles.boxText}>
            <Text
              text="    Müqavilə"
              type="regular"
              size="10"
              position="left"
            />
            <Text
              text="SİMA QR imza"
              type="regular"
              size="10"
              position="left"
            />
          </View>
          <View style={globalStyle.space20VT} />
          <View style={styles.text}>
            <Text
              text="Müqavilə sample"
              type="semiBold"
              size="20"
              position="left"
            />
            <View style={globalStyle.space10VT} />
            <Text
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec tellus at tellus dictum sollicitudin. Cras vel orci eget dui sollicitudin commodo at eget sapien. Praesent commodo tristique ante, nec dignissim nibh aliquet vel. In hac habitasse platea dictumst. Fusce commodo tincidunt risus, eget maximus est aliquam vel. Nam vitae velit rutrum, interdum diam sit amet, consectetur quam. Praesent ac auctor felis. Proin posuere aliquam ornare. Aliquam eros sem, suscipit eu malesuada eget, venenatis lacinia augue. Donec varius massa lacinia diam vestibulum rutrum."
              type="regular"
              size="14"
              position="left"
            />
          </View>
          <View style={globalStyle.space30VT} />
          <MainButton
            text="SİMA ilə imzala"
            color="#22C55E"
            onPress={() => navigation.navigate("Signature")}
          />
          <View style={globalStyle.space20VT} />
          <BorderedButton
            text="Müqavilədən imtina et"
            onPress={() => setIsModalOpen(true)}
            color="#FF6745"
          />
        </ScrollView>
      </View>
      <CancelCreditModal state={isModalOpen} setState={setIsModalOpen} />
    </>
  );
}
