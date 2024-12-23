import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.greyBackground,
    },
    imageBackground: {
      width: width,
      height: "220@s",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      position: "absolute",
      bottom: -20,
    },
    calculatorContainer: {
      width: "100%",
      backgroundColor: colors.backgroundColor,
      padding: 15,
      borderRadius: 16,
    },
  });
