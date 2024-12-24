import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      width: "100%",
      height: "40@s",
      flexDirection: "row",
      backgroundColor: colors.backgroundColor,
    },
  });
