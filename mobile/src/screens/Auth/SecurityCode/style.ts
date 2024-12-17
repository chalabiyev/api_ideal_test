import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      alignItems: "center",
    },
    pinbox: {
      height: "30@s",
      width: "30@s",
      backgroundColor: colors.lightGrey,
      borderRadius: "30@s",
      marginRight: 10,
    },
    pinboxContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    numberBox: {
      width: "90@s",
      height: "60@s",
      borderRadius: 16,
      backgroundColor: colors.greyBackground,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
    },
    deletePinBox: {
      position: "absolute",
      right: 0,
      bottom: 20,
    },
  });
