// style.ts
import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.whiteText,
    },
    messageContainer: {
      height: "60@s",
      width: "60@s",
      borderRadius: 60,
      opacity: 0.7,
      backgroundColor: colors.defaultdButton,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 10,
      left: 20,
      zIndex: 99,
    },
    videocallScreen: {
      flex: 1, // tüm alanı kaplasın
      width: "100%",
      borderWidth: 0.3,
      borderColor: colors.greyBackground,
      alignItems: "center",
      // justifyContent: 'center', // isterseniz
    },
    callStick: {
      width: "90%",
      flexDirection: "row",
      position: "absolute",
      bottom: 100,
      justifyContent: "space-between",
      zIndex: 99,
    },
    stickBox: {
      height: "55@s",
      width: "55@s",
      borderRadius: 55,
      opacity: 0.7,
      alignItems: "center",
      justifyContent: "center",
    },
    settingsBox: {
      width: "150@s",
      borderRadius: 16,
      backgroundColor: "#3C4865",
      position: "absolute",
      top: -85,
      right: 45,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });
