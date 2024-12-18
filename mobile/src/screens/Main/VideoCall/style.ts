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
    },
    videocallScreen: {
      height: "100%",
      width: "100%",
      borderWidth: 0.3,
      borderColor: colors.greyBackground,
      alignItems: "center",
    },
    callStick: {
      width: "90%",
      flexDirection: "row",
      position: "absolute",
      bottom: 100,
      justifyContent: "space-between",
    },
    stickBox: {
      height: "55@s",
      width: "55@s",
      borderRadius: 55,
      opacity: 0.7,
      alignItems: "center",
      justifyContent: "center",
    },
  });
