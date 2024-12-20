import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    modal: {
      borderRadius: 6,
      justifyContent: "center",
      maxHeight: "70%",
      width: "90%",
      backgroundColor: colors.backgroundColor,
    },
    container: {
      padding: 20,
      flex: 1,
    },
  });
