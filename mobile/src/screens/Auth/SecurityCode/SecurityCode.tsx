import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Animated,
  Vibration,
} from "react-native";
import { makeStyles } from "./style";
import { MainHeader, Text } from "../../../components";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { useNavigation } from "@react-navigation/native";
import { DeletePin } from "../../../assets";

const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function SecurityCode() {
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const TEST_PIN = "1111";
  const boxCount = 4;
  const keypadLayout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0"],
  ];
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNumberPress = (number: string) => {
    if (code.length < boxCount) {
      const newCode = code + number;
      setCode(newCode);

      if (newCode.length === boxCount) {
        if (newCode === TEST_PIN) {
          navigation.navigate("Private", { screen: "Home" });
        } else {
          setIsError(true);
          triggerShake();
          Vibration.vibrate(500);
          setTimeout(() => {
            setIsError(false);
            setCode("");
          }, 1000);
        }
      }
    }
  };

  const handleDeletePress = () => {
    setCode((prev) => prev.slice(0, -1));
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <MainHeader text="" />
      <View style={styles.container}>
        <Text
          text="Giriş kodu daxil edin"
          type="regular"
          size="20"
          position="center"
        />
        <View style={globalStyle.space30VT} />
        <Animated.View
          style={[
            styles.pinboxContainer,
            {
              transform: [{ translateX: shakeAnimation }],
            },
          ]}
        >
          {Array.from({ length: boxCount }).map((_, index) => {
            const isFilled = index < code.length;
            return (
              <View
                key={index}
                style={[
                  styles.pinbox,
                  {
                    backgroundColor: isFilled
                      ? colors.defaultdButton
                      : colors.greyBackground,
                    borderColor: isError ? "red" : "transparent",
                  },
                ]}
              />
            );
          })}
        </Animated.View>
        {isError && (
          <Text
            text="Yanlış PIN kod"
            type="regular"
            size="16"
            color={"red"}
            position="center"
            style={{ marginTop: 10 }}
          />
        )}
        <View style={globalStyle.space50VT} />
        <View style={{ alignItems: "center" }}>
          {keypadLayout.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{ flexDirection: "row", marginVertical: 10 }}
            >
              {row.map((number) => (
                <TouchableOpacity
                  key={number}
                  style={styles.numberBox}
                  onPress={() => handleNumberPress(number)}
                >
                  <Text
                    text={number}
                    type="regular"
                    size="24"
                    position="center"
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity
            onPress={handleDeletePress}
            style={styles.deletePinBox}
          >
            <DeletePin height={50} width={100} />
          </TouchableOpacity>
        </View>
        <View style={globalStyle.space50VT} />
        <TouchableOpacity onPress={() => navigation.navigate("SimaSignature")}>
          <Text text="Kodu unutdum" type="regular" size="18" isBlue />
        </TouchableOpacity>
      </View>
    </>
  );
}
