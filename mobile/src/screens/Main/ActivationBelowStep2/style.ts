import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.whiteText,
    },
    topContainer: {
      flexDirection: "row",
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      height: 55,
      width: 55,
      borderRadius: 70,
      alignItems: "center",
      justifyContent: "center",
    },
    dvider: {
      width: "80@s",
      height: 0.7,
      backgroundColor: colors.defaultdButton,
    },
    scrollView: {
      flexGrow: 1,
      alignItems: "center",
    },
    boxText: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "86%",
    },
    text: {
      width: "96%",
    },
  });
