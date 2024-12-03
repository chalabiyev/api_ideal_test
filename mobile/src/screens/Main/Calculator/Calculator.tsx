import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {makeStyles} from './style';
import {BottomNavigationContainer, Container, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import MainButton from '../../../components/Fit/Button/MainButton';
import Slider from '@react-native-community/slider';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function Calculator() {
  const initialLayout = {width: Dimensions.get('window').width};
  const [creditAmount, setCreditAmount] = useState(4000);
  const [creditMounth, setCreditMounth] = useState(1);
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.greyBackground}} />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Text
            text="Kredit kalkulyatoru"
            type="semiBold"
            size="20"
            position="center"
          />

          <ImageBackground
            style={styles.imageBackground}
            resizeMode="contain"
            source={require('../../../assets/images/CalculatorBackground/CalculatorBackground.png')}>
            <Text
              text={'4980.30' + ' ₼'}
              type="bold"
              size="36"
              position="center"
              isWhite
            />
            <Text
              text="Cəmi ödəniləcək məbləğ"
              type="regular"
              size="16"
              position="center"
              isWhite
            />
            <View style={styles.button}>
              <MainButton text="Müraciət et" onPress={() => {}} />
            </View>
          </ImageBackground>
          <View style={globalStyle.space30VT} />
          <Container>
            <View style={styles.calculatorContainer}>
              <Text text="Aylıq ödəniş:" type="regular" size="16" isGray />
              <View style={globalStyle.space3VT} />
              <Text text={'207.51' + ' ₼'} type="regular" size="18" />
              <View style={globalStyle.space20VT} />
              <Text text="Cəmi faiz:" type="regular" size="16" isGray />
              <View style={globalStyle.space3VT} />
              <Text text={'980.30' + ' ₼'} type="regular" size="18" />
            </View>
            <View style={globalStyle.space20VT} />
            <View style={styles.calculatorContainer}>
              <Text text="Kreditin məbləği:" type="regular" size="16" isGray />
              <View style={globalStyle.space3VT} />
              <Text text={creditAmount + ' ₼'} type="regular" size="18" />
              <View style={globalStyle.space20VT} />
              <Slider
                minimumValue={1000}
                maximumValue={10000}
                step={100}
                value={creditAmount}
                onValueChange={value => setCreditAmount(value)}
                minimumTrackTintColor="#3f51b5"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#3f51b5"
              />
              <View style={globalStyle.space20VT} />
              <Text
                text="Kreditin müddəti (aylarla):"
                type="regular"
                size="16"
                isGray
              />
              <View style={globalStyle.space3VT} />
              <Text text={creditMounth} type="regular" size="18" />
              <View style={globalStyle.space20VT} />
              <Slider
                minimumValue={1}
                maximumValue={24}
                step={1}
                value={creditMounth}
                onValueChange={value => setCreditMounth(value)}
                minimumTrackTintColor="#3f51b5"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#3f51b5"
              />
            </View>
          </Container>
          <View style={globalStyle.space50VT} />
          <View style={globalStyle.space50VT} />
        </ScrollView>
        <View style={{width: '100%', alignItems: 'center'}}>
          <BottomNavigationContainer />
        </View>
      </View>
    </>
  );
}
