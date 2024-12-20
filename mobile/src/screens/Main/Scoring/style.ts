import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.whiteText,
    },
    scoringTable: {
      height: "250@s",
      width: "90%",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      alignItems: "center",
    },
  });
