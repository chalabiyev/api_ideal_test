import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { makeStyles } from "./style";
import {
  BottomNavigationContainer,
  CardFolder,
  Container,
  LastOperation,
  OperationStick,
  Text,
} from "../../../components";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { NotficationIcon } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import OperationsData from "../../../mockupData/OperationsData";

const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width } = Dimensions.get("window");

export default function Home() {
  const [showListCredit, setShowListCredit] = useState(false);
  const [showListInsurance, setShowListInsurance] = useState(false);
  const creditListHeight = useRef(new Animated.Value(0)).current;
  const insuranceListHeight = useRef(new Animated.Value(0)).current;
  const creditListOpacity = useRef(new Animated.Value(0)).current;
  const insuranceListOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const mockupData = [
    {
      id: "1",
      image: require("../../../assets/images/Cards/FastMoneyCard.png"),
      onPress: () => navigation.navigate("Signature"),
    },
    {
      id: "2",
      image: require("../../../assets/images/Cards/MoneyCredit.png"),
      onPress: () => navigation.navigate("VideoCall"),
    },
    {
      id: "3",
      image: require("../../../assets/images/Cards/PartnerCard.png"),
      onPress: () => navigation.navigate("SelectPartners"),
    },
  ];

  const mockupData2 = [
    {
      id: "1",
      image: require("../../../assets/images/Cards/PropertyInsurance.png"),
    },
    {
      id: "2",
      image: require("../../../assets/images/Cards/TransportationInsurance.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={item.onPress}
      style={{ height: 200, width: 310 }}
    >
      <Image style={styles.cardImage} source={item.image} />
    </TouchableOpacity>
  );

  const toggleCreditList = () => {
    setShowListCredit(!showListCredit);
    setShowListInsurance(false);

    if (!showListCredit) {
      Animated.parallel([
        Animated.spring(creditListHeight, {
          toValue: 200,
          useNativeDriver: false,
          speed: 2,
          bounciness: 10,
        }),
        Animated.timing(creditListOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();

      Animated.timing(insuranceListHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.parallel([
        Animated.timing(creditListHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(creditListOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const toggleInsuranceList = () => {
    setShowListInsurance(!showListInsurance);
    setShowListCredit(false);

    if (!showListInsurance) {
      Animated.parallel([
        Animated.spring(insuranceListHeight, {
          toValue: 200,
          useNativeDriver: false,
          speed: 2,
          bounciness: 5,
        }),
        Animated.timing(insuranceListOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();

      Animated.timing(creditListHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.parallel([
        Animated.timing(insuranceListHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(insuranceListOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.greyBackground }} />
      <View style={styles.container}>
        <View style={globalStyle.space20VT} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.topContainer}
            >
              <View style={styles.topContainerLeft}>
                <Image
                  style={styles.profileImage}
                  source={require("../../../assets/images/ProfileFoto.png")}
                />
              </View>
              <View style={styles.topContainerMid}>
                <Text text="Elşən Quliyev" type="bold" size="20" />
              </View>
              <View style={styles.topContainerRight}>
                <View style={styles.notficatonContainer}>
                  <NotficationIcon />
                </View>
              </View>
            </TouchableOpacity>
            <View style={globalStyle.space10VT} />

            <CardFolder
              onPressCredits={toggleCreditList}
              onPressInsurance={toggleInsuranceList}
            />
            <View style={globalStyle.space10VT} />

            <Animated.View
              style={{
                height: creditListHeight,
                opacity: creditListOpacity,
                overflow: "hidden",
              }}
            >
              <FlatList
                data={mockupData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={width}
                decelerationRate="fast"
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              />
            </Animated.View>
            <Animated.View
              style={{
                height: insuranceListHeight,
                opacity: insuranceListOpacity,
                overflow: "hidden",
              }}
            >
              <FlatList
                data={mockupData2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={width}
                decelerationRate="fast"
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              />
            </Animated.View>

            <View style={globalStyle.space10VT} />
            <OperationStick />
          </View>
          <View style={globalStyle.space20VT} />
          <Container>
            <View style={styles.titleContainer}>
              <Text text="Son əməliyyatlar" type="semiBold" size="16" />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Transaction")}
              >
                <Text text="Hamısını Bax" type="regular" size="14" isBlue />
              </TouchableOpacity>
            </View>
          </Container>
          <Container>
            <View style={globalStyle.space10VT} />
            <View style={styles.containerTransaction}>
              <FlatList
                data={OperationsData.slice(0, 3)}
                renderItem={({ item }) => <LastOperation item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          </Container>
          <View style={globalStyle.space50VT} />
          <View style={globalStyle.space50VT} />
        </ScrollView>
        <BottomNavigationContainer />
      </View>
    </>
  );
}
