import React, { useState } from "react";
import { SafeAreaView, View, ImageBackground } from "react-native";
import { makeStyles } from "./style";
import {
  Button,
  Container,
  MainHeader,
  PhoneInput,
  PrivacyAndTermsOfUse,
  Text,
} from "../../../components";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { useNavigation } from "@react-navigation/native";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <MainHeader text="" />
      <View style={styles.container}>
        <View style={globalStyle.space30VT} />
        <Text text="Qeydiyyat" type="regular" size="20" position="center" />
        <View style={globalStyle.space20VT} />
        <View style={globalStyle.space20VT} />
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../../assets/images/BackgroundImage/RegisterBackground.png")}
        >
          <View>
            <View style={globalStyle.space20VT} />
            <Container>
              <PhoneInput
                placeholder="Mobil nömrə"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
              />

              <Text
                text="Mobil nömrənizi daxil edin və sizə OTP kodu göndəriləcək."
                type="regular"
                size="12"
                isGray
              />
            </Container>
          </View>
          <View style={styles.footer}>
            <Button
              text="Davam et"
              onPress={() => navigation.navigate("Otp")}
              disable={phoneNumber ? false : true}
            />
            <View style={globalStyle.space10VT} />
            <PrivacyAndTermsOfUse
              onPressPrivacy={() => alert("Privacy")}
              onPressTerms={() => alert("Terms")}
            />
            <View style={globalStyle.space30VT} />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
