import React, { useCallback, useEffect } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { makeStyles } from "./style";
import { MainHeader, Text } from "../../../components";
import colors from "../../../constants/colors/colors";
import MainButton from "../../../components/Fit/Button/MainButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SimaModule from "../../../components/Sima/SimaModule";
import { PERMISSIONS, check, RESULTS, request } from "react-native-permissions";

// Ваш clientId и язык
const clientId = 3144201;
const language = "az";

const service = "bio-imza"; //ESAM Kredit
const key = "441DD043-328C-4FD3-9D2D-8B120106D0D8";

const styles = makeStyles();
export default function SimaSignature() {
  const navigation = useNavigation();

  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const result = await check(permission);

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        console.log("Доступ к камере предоставлен");
      } else {
        console.log("Доступ к камере отклонен");
      }
    } else if (result === RESULTS.GRANTED) {
      console.log("Доступ к камере уже предоставлен");
    } else {
      console.log("Доступ к камере отклонен или ограничен");
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const username = "esaminnovations_ios_sdk_v1";
  const password = "^L5&xP7@qV9^T3#rY2!kD6%Z8*nW";
  const language = "az"; // или 'ru', 'az'
  const initializeAndRegisterSima = async () => {
    try {
      // Инициализируем SDK
      const initResult = await SimaModule.initialize(
        username,
        password,
        language
      );
      console.log(initResult); // "SDK initialized successfully"

      // После успешной инициализации вызываем метод регистрации
      const registerResult = await SimaModule.register();
      console.log(registerResult); // "Регистрация успешна"
    } catch (error) {
      console.error("Ошибка инициализации или регистрации:", error);
    }
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <MainHeader />
      <View style={styles.container}>
        <Text text="SimaSignature" type="semiBold" size="12" />
        <MainButton text="SimaSignature" onPress={initializeAndRegisterSima} />
      </View>
    </>
  );
}
