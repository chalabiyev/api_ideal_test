import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { ContractModal, Text } from "../../../components";
import {
  AddUserIcon,
  CameraIcon,
  CancelCameraIcon,
  CloseTelephoneIcon,
  MessageIcon,
  MicrofonIcon,
  CancelMicrofonIcon,
  ShareIcon,
  ShareScreenIcon,
} from "../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function VideoCall() {
  const navigation = useNavigation();
  const route = useRoute();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [isCameraOn, setCameraOn] = useState(true);
  const [isMicrophoneOn, setMicrophoneOn] = useState(true);
  const animationValue = useRef(new Animated.Value(0)).current;
  const [isModalOpen, setModalOpen] = useState(false);

  // Yeni state: Sima imzasından gələn gif göstəricisi
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    // Parametr varsa, VideoCall-a girərkən gif göstəririk.
    if (route.params?.showGif) {
      setShowGif(true);
      // 2 saniyə sonra gif-i gizlət
      setTimeout(() => {
        setShowGif(false);
      }, 2000);
    }
  }, [route.params]);

  const handleSharePress = () => {
    setBoxVisible(!isBoxVisible);
    Animated.timing(animationValue, {
      toValue: isBoxVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  const toggleMicrophone = () => {
    setMicrophoneOn((prev) => !prev);
  };

  const boxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const boxOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (elapsedSeconds === 3) {
      setModalOpen(true);
    }
  }, [elapsedSeconds]);

  const mockupData = [
    {
      id: "1",
      icon: isCameraOn ? <CameraIcon /> : <CancelCameraIcon />,
      onPress: toggleCamera,
      backgroundColor: "#1D7BF5",
    },
    {
      id: "2",
      icon: isMicrophoneOn ? <MicrofonIcon /> : <CancelMicrofonIcon />,
      onPress: toggleMicrophone,
      backgroundColor: "#1D7BF5",
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
      onPress: () => navigation.navigate("Scoring"),
      backgroundColor: "#1D7BF5",
    },
  ];

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.whiteText }} />
      <View style={styles.container}>
        <Text text="Video" type="semiBold" size="20" position="center" />
        <View style={styles.videocallScreen}>
          {showGif ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/gif/signing.gif")}
                style={{
                  width: scale(300),
                  height: scale(300),
                  marginLeft: 40,
                  bottom: 100,
                }}
                resizeMode="contain"
              />
            </View>
          ) : (
            // Normal View
            <>
              <View style={globalStyle.space20VT} />
              <Text
                text={formatTime(elapsedSeconds)}
                type="regular"
                size="16"
                position="center"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.messageContainer}
              >
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
                  style={[
                    styles.settingsBox,
                    {
                      height: boxHeight,
                      opacity: boxOpacity,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.stickBox, { backgroundColor: "#1D7BF5" }]}
                  >
                    <AddUserIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.stickBox, { backgroundColor: "#1D7BF5" }]}
                  >
                    <ShareScreenIcon />
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </>
          )}
        </View>
      </View>
      <ContractModal state={isModalOpen} setState={setModalOpen} />
    </>
  );
}
