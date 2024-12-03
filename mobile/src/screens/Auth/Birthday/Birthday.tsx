import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {makeStyles} from './style';
import {CalendarInput, Container, MainHeader, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {useNavigation} from '@react-navigation/native';
import MainButton from '../../../components/Fit/Button/MainButton';
import {Calendar} from '../../../assets';
import DateTimePicker from '@react-native-community/datetimepicker';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
export default function Birthday() {
  const navigation = useNavigation();
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);

  const handleNext = () => {
    if (birthDate) {
      navigation.navigate('TelephoneNumber');
    }
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <View style={globalStyle.space30VT} />
        <View style={styles.box}>
          <Container>
            <View style={styles.topAndBottom}>
              <Text
                text="Doğum tarixinizi daxil edin"
                type="regular"
                size="20"
              />
              <View style={globalStyle.space20VT} />
              <Text
                text="Qeydiyyatdan keçmək üçün 18 yaşdan yuxarı olmalısınız."
                type="regular"
                size="12"
                isGray
              />
              <View style={globalStyle.space30VT} />
              <CalendarInput
                placeholder="Doğum tarixi"
                onDateChange={setBirthDate}
              />
              <View style={globalStyle.space20VT} />
            </View>
          </Container>
          <View style={styles.topAndBottom}>
            <MainButton
              text="Davam et"
              onPress={handleNext}
              disable={!birthDate}
            />
            <View style={globalStyle.space30VT} />
          </View>
        </View>
      </View>
    </>
  );
}
