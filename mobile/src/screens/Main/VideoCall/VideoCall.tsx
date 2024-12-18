import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { MainHeader, Text } from "../../../components";
import {
  CameraIcon,
  CloseTelephoneIcon,
  MessageIcon,
  MicrofonIcon,
  ShareIcon,
} from "../../../assets";
import { useNavigation } from "@react-navigation/native";

const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function VideoCall() {
  const navigation = useNavigation();
  const [isBoxVisible, setBoxVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const handleSharePress = () => {
    setBoxVisible(!isBoxVisible);
    Animated.timing(animationValue, {
      toValue: isBoxVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const boxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });

  const boxOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const mockupData = [
    {
      id: "1",
      icon: <CameraIcon />,
      onPress: () => navigation.navigate("Signature"),
      backgroundColor: colors.defaultdButton,
    },
    {
      id: "2",
      icon: <MicrofonIcon />,
      onPress: () => navigation.navigate("VideoCall"),
      backgroundColor: colors.defaultdButton,
    },
    {
      id: "3",
      icon: <ShareIcon />,
      onPress: handleSharePress,
      backgroundColor: "#3C4865",
    },
    {
      id: "4",
      icon: <CloseTelephoneIcon />,
      onPress: () => navigation.navigate("SelectPartners"),
      backgroundColor: colors.defaultButtonSkyBlue,
    },
  ];

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.whiteText }} />
      <MainHeader />
      <View style={styles.container}>
        <Text text="Video" type="semiBold" size="20" position="center" />
        <View style={styles.videocallScreen}>
          <TouchableOpacity style={styles.messageContainer}>
            <MessageIcon />
          </TouchableOpacity>
          <View style={styles.callStick}>
            {mockupData.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                style={[
                  styles.stickBox,
                  { backgroundColor: item.backgroundColor },
                ]}
              >
                {item.icon}
              </TouchableOpacity>
            ))}

            <Animated.View
              style={{
                height: boxHeight,
                width: 150,
                borderRadius: 16,
                backgroundColor: "#3C4865",
                position: "absolute",
                top: -75,
                right: 55,
                alignItems: "center",
                justifyContent: "center",
                opacity: boxOpacity,
              }}
            ></Animated.View>
          </View>
        </View>
      </View>
    </>
  );
}
