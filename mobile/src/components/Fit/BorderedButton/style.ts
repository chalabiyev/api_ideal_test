import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      width: "96%",
      height: "50@s",
      borderRadius: "16@s",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderWidth: 1,
    },
  });
