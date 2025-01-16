import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { makeStyles } from "./style";
import {
  BottomNavigationContainer,
  Container,
  Text,
} from "../../../components";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import PartnersData from "../../../mockupData/Partners";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function SelectPartners() {
  const navigation = useNavigation();

  const renderPopularPartner = ({ item }) => (
    <Container>
      <TouchableOpacity
        style={{
          height: scale(70),
          width: "100%",
          borderRadius: 16,
          backgroundColor: item.backgroundColor || colors.lightGrey,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("VideoCall", { PartnersData: item });
        }}
      >
        <Image style={styles.imageContainer} source={item.image} />
      </TouchableOpacity>
      <Text text={"    " + item.title} type="semiBold" size="14" />
    </Container>
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.greyBackground }} />
      <View style={styles.container}>
        <ScrollView>
          <Text
            text="Partnyorlar"
            type="semiBold"
            size="20"
            position="center"
          />
          <View style={globalStyle.space20VT} />

          <FlatList
            data={PartnersData}
            renderItem={renderPopularPartner}
            keyExtractor={(item) => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
          <View style={globalStyle.space50VT} />
          <View style={globalStyle.space50VT} />
        </ScrollView>
        <BottomNavigationContainer />
      </View>
    </>
  );
}
