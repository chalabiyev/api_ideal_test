import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, TouchableOpacity } from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { MainHeader, Text } from "../../../components";
import { StarIcon } from "../../../assets";
import MainButton from "../../../components/Fit/Button";
import { useNavigation } from "@react-navigation/native";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function Scoring() {
  const globalStyle = globalSpacingStyle();
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();
  const stars = [1, 2, 3, 4, 5];
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      <View style={styles.container}>
        <View style={styles.scoringTable}>
          <View style={globalStyle.space20VT} />
          <Text
            text="Operatoru qiymətləndirin"
            type="semiBold"
            size="16"
            position="center"
            isBlue
          />
          <View style={globalStyle.space20VT} />
          <View style={{ flexDirection: "row" }}>
            {stars.map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.95}
              >
                <StarIcon color={star <= rating ? "#4A89DC" : "#C0C0C0"} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={globalStyle.space30VT} />
          <MainButton
            text="Göndərmək"
            onPress={() => navigation.navigate("Home")}
          />
          <View style={globalStyle.space20VT} />
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text
              text="İmtina"
              type="semiBold"
              size="16"
              position="center"
              isBlue
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
