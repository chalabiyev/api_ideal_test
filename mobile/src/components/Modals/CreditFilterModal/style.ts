import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    modal: {
      borderRadius: 6,
      justifyContent: "center",
      height: null,
      width: "100%",
      backgroundColor: colors.backgroundColor,
    },
    container: {
      alignItems: "center",
      padding: 20,
    },
  });
