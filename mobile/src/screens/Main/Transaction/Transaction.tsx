import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';
import {makeStyles} from './style';
import {
  BottomNavigationContainer,
  LastOperation,
  MonthModal,
  Text,
} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {Calendar, FilterIcon, SearchIcon} from '../../../assets';
import OperationsData from '../../../mockupData/OperationsData';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function Transaction() {
  const [isMonthModal, setIsMonthModal] = useState(false);

  const toggleMonthModal = () => {
    setIsMonthModal(!isMonthModal);
  };
  const fastCreditHeight = useRef(new Animated.Value(0)).current;
  const fastCreditOpacity = useRef(new Animated.Value(0)).current;

  const partnersHeight = useRef(new Animated.Value(0)).current;
  const partnersOpacity = useRef(new Animated.Value(0)).current;

  const autoHeight = useRef(new Animated.Value(0)).current;
  const autoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fastCreditHeight, {
          toValue: 80,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(fastCreditOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(partnersHeight, {
          toValue: 80,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(partnersOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(autoHeight, {
          toValue: 80,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(autoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.splashBackground}} />
      <View style={styles.container}>
        <MonthModal state={isMonthModal} setState={setIsMonthModal} />
        <ScrollView>
          <View style={styles.topContainer}>
            <View style={globalStyle.space20VT} />
            <View style={{paddingLeft: 10}}>
              <Text
                text="Ödənişlər"
                type="bold"
                size="24"
                isWhite
                position="center"
              />
              <Text
                text="Ümumi balans"
                type="semiBold"
                size="16"
                isWhite
                position="left"
              />
              <Text
                text={'2534.12' + ' ₼'}
                type="bold"
                size="20"
                isWhite
                position="left"
              />
              <View style={globalStyle.space20VT} />
              <Text
                text="Bütün kreditlər"
                type="semiBold"
                size="20"
                isWhite
                position="left"
              />
            </View>
            <View style={globalStyle.space10VT} />
            <Animated.View
              style={[
                styles.fastCreditContainer,
                {height: fastCreditHeight, opacity: fastCreditOpacity},
              ]}>
              <Text
                text="Sürətli pul krediti"
                type="regular"
                size="14"
                position="left"
              />
              <Text
                text={'814.53' + ' ₼'}
                type="semiBold"
                size="20"
                position="left"
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.partnersContainer,
                {height: partnersHeight, opacity: partnersOpacity},
              ]}>
              <Text
                text="Partnyorluq krediti"
                type="regular"
                size="14"
                position="left"
              />
              <Text
                text={'333.13' + ' ₼'}
                type="semiBold"
                size="20"
                position="left"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.autoContainer,
                {height: autoHeight, opacity: autoOpacity},
              ]}>
              <Text
                text="Avtolizinq"
                type="regular"
                size="14"
                position="left"
              />
              <Text
                text={'20.04' + ' ₼'}
                type="semiBold"
                size="20"
                position="left"
              />
            </Animated.View>
          </View>
          <View style={globalStyle.space10VT} />
          <Text
            text="Ödəniş tarixi"
            type="semiBold"
            size="20"
            position="center"
          />
          <View style={globalStyle.space10VT} />
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.left}>
              <FilterIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mid} onPress={toggleMonthModal}>
              <View style={styles.calendarButton}>
                <Text text="Sentyabr" type="regular" size="18" />
                <Calendar />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.right}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
          <View style={globalStyle.space10VT} />
          <FlatList
            data={OperationsData}
            renderItem={({item}) => <LastOperation item={item} />}
            keyExtractor={item => item.id}
          />
          <View style={globalStyle.space50VT} />
          <View style={globalStyle.space50VT} />
        </ScrollView>
        <BottomNavigationContainer />
      </View>
    </>
  );
}
