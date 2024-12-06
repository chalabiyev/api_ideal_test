import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {makeStyles} from './style';
import {
  CalendarInput,
  Container,
  DropDownMenu,
  Input,
  MainHeader,
  Text,
} from '../../../components';
import colors from '../../../constants/colors/colors';
import {Camera, Document} from '../../../assets';
import {globalSpacingStyle} from '../../../constants/space/style';
import MainButton from '../../../components/Fit/Button/MainButton';
import {useNavigation} from '@react-navigation/native';

const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function ProfileInformations() {
  const navigation = useNavigation();

  const [brandName, setBrandName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [director, setDirector] = useState<string>('');
  const [voen, setVoen] = useState<string>('');
  const [city, setCity] = useState('');
  const [adress, setAdress] = useState('');
  const [companyStartDate, setCompanyStartDate] = useState<Date | undefined>(
    undefined,
  );
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const isButtonDisabled =
    !brandName ||
    !companyName ||
    !director ||
    !voen ||
    !city ||
    !adress ||
    !companyStartDate ||
    !selectedActivity ||
    !selectedCountry;

  const handleButtonPress = () => {
    if (!isButtonDisabled) {
      navigation.navigate('BankInformations');
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Text text="Profil" type="regular" size="20" position="center" />
          <Container>
            <View style={styles.photoContainer}>
              <View style={styles.photoBox}>
                <Camera />
                <Text
                  text="Logo"
                  type="regular"
                  size="12"
                  position="center"
                  isGray
                />
              </View>
            </View>
            <Text
              text="Faylın genişlənmələsi: .jpg, .jpeg, .png"
              type="regular"
              size="12"
              position="left"
              isGray
            />
            <View style={globalStyle.space20VT} />
            <Input
              placeholder="Brendin adı"
              value={brandName}
              onChangeText={setBrandName}
              autoCapitalize="none"
              keyboardType="default"
            />
            <Input
              placeholder="Sahibkarın adı/ Şirkətin adı"
              value={companyName}
              onChangeText={setCompanyName}
              autoCapitalize="none"
              keyboardType="default"
            />

            <Input
              placeholder="Direktor/Sahibi"
              value={director}
              onChangeText={setDirector}
              autoCapitalize="none"
              keyboardType="default"
            />
            <CalendarInput
              placeholder="Doğum tarixi"
              onDateChange={setCompanyStartDate}
            />
            <Input
              placeholder="VÖEN"
              value={voen}
              onChangeText={setVoen}
              autoCapitalize="none"
              keyboardType="default"
            />
            <DropDownMenu
              data={[
                {id: 1, label: 'Option 1'},
                {id: 2, label: 'Option 2'},
                {id: 3, label: 'Option 3'},
                {id: 4, label: 'Option 4'},
              ]}
              selectedItem={selectedActivity}
              onSelect={setSelectedActivity}
              text="Şirkətin fəaliyyət sahəsi"
            />
            <View style={globalStyle.space15VT} />
            <DropDownMenu
              data={[
                {id: 1, label: 'Option 1'},
                {id: 2, label: 'Option 2'},
                {id: 3, label: 'Option 3'},
                {id: 4, label: 'Option 4'},
              ]}
              selectedItem={selectedCountry}
              onSelect={setSelectedCountry}
              text="Ölkə"
            />
            <Input
              placeholder="Şəhər"
              value={city}
              onChangeText={setCity}
              autoCapitalize="none"
              keyboardType="default"
            />
            <Input
              placeholder="Ünvan"
              value={adress}
              onChangeText={setAdress}
              autoCapitalize="none"
              keyboardType="default"
            />
            <View style={styles.photoContainer}>
              <View style={styles.photoBox}>
                <Document />
                <Text
                  text="Sənədlər"
                  type="regular"
                  size="12"
                  position="center"
                  isGray
                />
              </View>
            </View>
            <Text
              text="Tələb olunan sənədlər - şəxsiyyət vəsiqəsi, VÖEN
Faylın genişlənmələsi: .jpg, .jpeg, .png, .pdf"
              type="regular"
              size="12"
              position="left"
              isGray
            />
          </Container>
          <View style={globalStyle.space20VT} />
          <View style={{alignItems: 'center'}}>
            <MainButton
              text="Davam et"
              onPress={handleButtonPress}
              disable={isButtonDisabled}
            />
          </View>
          <View style={globalStyle.space30VT} />
        </ScrollView>
      </View>
    </>
  );
}
