import React, { useCallback, useEffect, useState } from "react";
import { Platform, SafeAreaView, View, ToastAndroid } from "react-native";
import { makeStyles } from "./style";
import { MainHeader, Text } from "../../../components";
import colors from "../../../constants/colors/colors";
import MainButton from "../../../components/Fit/Button/MainButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SimaModule from "../../../components/Sima/SimaModule";
import { PERMISSIONS, check, RESULTS, request } from "react-native-permissions";

const clientId = 3144201;
const language = "az";

const service = "ESAM Kredit";
const key = "441DD043-328C-4FD3-9D2D-8B120106D0D8";

const styles = makeStyles();

export default function SimaSignature() {
  const navigation = useNavigation();
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const result = await check(permission);

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        console.log("Kamera erişimi verildi");
      } else {
        console.log("Kamera erişimi reddedildi");
      }
    } else if (result === RESULTS.GRANTED) {
      console.log("Kamera erişimi zaten verildi");
    } else {
      console.log("Kamera erişimi reddedildi veya kısıtlandı");
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const username = "esaminnovations_ios_sdk_v1";
  const password = "^L5&xP7@qV9^T3#rY2!kD6%Z8*nW";
  const sdkLanguage = "az";

  const initializeAndRegisterSima = async () => {
    try {
      const initResult = await SimaModule.initialize(
        username,
        password,
        clientId,
        sdkLanguage
      );
      console.log(initResult);
      setSdkInitialized(true);

      const registerResult = await SimaModule.register();
      console.log(registerResult);
      setIsRegistered(true);

      ToastAndroid.show(
        "SİMA SDK Başarıyla Başlatıldı ve Kayıt Oldu",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.error("İnisiyalizasyon veya kayıt hatası:", error);
      ToastAndroid.show(`Hata: ${error.message}`, ToastAndroid.LONG);
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <MainHeader text="" />
      <View style={styles.container}>
        <Text text="SimaSignature" type="semiBold" size="12" />
        <MainButton
          text="SimaSignature"
          onPress={initializeAndRegisterSima}
          disabled={sdkInitialized && isRegistered}
        />
      </View>
    </>
  );
}
