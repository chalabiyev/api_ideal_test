import { ScaledSheet } from "react-native-size-matters";
import colors from "../../../constants/colors/colors";

export const makeStyles = () =>
  ScaledSheet.create({
    modal: {
      borderRadius: 6,
      justifyContent: "center",
      height: null,
      width: "96%",
      backgroundColor: colors.backgroundColor,
    },
    container: {
      alignItems: "center",
      padding: 20,
    },
    sectionInput: {
      height: "55@s",
      width: "90%",
      borderRadius: 16,
      borderWidth: 0.5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    sectionList: {
      width: "90%",
      backgroundColor: "white",
      borderRadius: 10,
      borderColor: colors.greyBackground,
      overflow: "hidden",
      position: "absolute",
      bottom: -125,
      opacity: 0.95,
      borderWidth: 1,
      zIndex: 1,
    },
    textInput: {
      width: "90%",
      height: "120@s",
      borderWidth: 1,
      borderColor: "#C4C4C4",
      borderRadius: 10,
      padding: 10,
      textAlignVertical: "top",
      fontSize: 16,
      color: "#333",
      backgroundColor: "#FFF",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
    },
  });
