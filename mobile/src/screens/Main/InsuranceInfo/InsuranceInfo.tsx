import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {makeStyles} from './style';
import {BottomNavigationContainer, Container, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import MainButton from '../../../components/Fit/Button';
import {useNavigation} from '@react-navigation/native';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
export default function InsuranceInfo({route}) {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.greyBackground}} />
      <View style={styles.container}>
        <Text
          text={route.params.InsuranceCoorporativeData.title}
          type="semiBold"
          size="20"
          position="center"
        />
        <Container>
          <View style={globalStyle.space20VT} />
          <Text text="İcbari Nəqliyyat sığortası" type="semiBold" size="16" />
          <View style={globalStyle.space3VT} />
          <Text
            text="İcbari Nəqliyyat sığortası avtonəqliyyat vasitələrinin Azərbaycan Respublikasının ərazisində istifadəsi nəticəsində fiziki şəxslərin sağlamlığına, həmçinin fiziki və hüquqi şəxslərin əmlakına vurulmuş zərərlərin əvəzinin ödənilməsi məqsədi ilə tətbiq edilir. 2011-ci ildə qüvvəyə minmiş “İcbari Sığortalar haqqında” Azərbaycan Respublikası Qanununa əsasən avtonəqliyyat vasitəsi sahiblərinin mülki məsuliyyətlərini sığorta etdirməsi icbari qaydada tələb olunur."
            type="regular"
            size="12"
          />
          <View style={globalStyle.space20VT} />
          <Text text="Kasko sığortası" type="semiBold" size="16" />
          <View style={globalStyle.space3VT} />
          <Text
            text="Siz avtomobilinizi könüllü (KASKO) sığorta etdirməklə baş verə biləcək qəzalardan sonra avtomobilinizin təmiri zamanı yaranacaq xərclərin sığorta tərəfindən ödənilməsi, avtomobilinizin oğurlanması, üçüncü şəxslərin qanunsuz hərəkətləri və s. zamanı əmlak maraqlarınızı qorumuş olursunuz."
            type="regular"
            size="12"
          />
        </Container>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <MainButton
              text="Müraciət et"
              onPress={() => navigation.navigate('Credits')}
            />
          </View>
        </View>
        <BottomNavigationContainer />
      </View>
    </>
  );
}
