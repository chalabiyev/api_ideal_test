import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { makeStyles } from "./style";
import {
  BottomNavigationContainer,
  Container,
  Text,
} from "../../../components";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import PartnersCategoryData from "../../../mockupData/PartnersCategory";
import PartnersData from "../../../mockupData/Partners";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function Partners() {
  const renderPartner = ({ item }) => (
    <View style={styles.categoryBox}>
      <View style={styles.top}>
        <Text text={item.title} type="regular" size="14" />
      </View>
      <View style={styles.partnerBox}>
        <Image
          style={{ height: 80, width: 80, resizeMode: "cover" }}
          source={item.image}
        />
      </View>
    </View>
  );

  const renderPopularPartner = ({ item }) => (
    <Container>
      <View
        style={{
          height: 80,
          width: "100%",
          borderRadius: 16,
          backgroundColor: item.backgroundColor || colors.lightGrey,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          source={item.image}
        />
      </View>
      <Text text={"    " + item.title} type="semiBold" size="14" />
    </Container>
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.greyBackground }} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            text="Partnyorlar"
            type="semiBold"
            size="20"
            position="center"
          />
          <View style={globalStyle.space20VT} />
          <Container>
            <Text
              text="Partnyorlar"
              type="semiBold"
              size="16"
              position="left"
            />
          </Container>
          <View style={globalStyle.space20VT} />
          <FlatList
            data={PartnersCategoryData}
            renderItem={renderPartner}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={globalStyle.space20VT} />

          <Container>
            <Text
              text="Popular partnyorlar"
              type="semiBold"
              size="16"
              position="left"
            />
          </Container>

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
