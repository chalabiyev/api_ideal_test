import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.greyBackground,
    },
    categoryBox: {
      marginLeft: 12,
      height: "90@s",
      width: "160@s",
      backgroundColor: colors.lightGrey,
      borderRadius: 16,
    },
    top: {
      height: "20%",
      width: "100%",
      marginLeft: 10,
      justifyContent: "center",
    },
    partnerBox: {
      height: "80%",
      width: "100%",
      alignItems: "flex-end",
      paddingRight: 20,
    },
  });
