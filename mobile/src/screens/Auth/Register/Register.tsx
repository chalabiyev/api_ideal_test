import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {makeStyles} from './style';
import {
  Button,
  Container,
  Input,
  MainHeader,
  PhoneInput,
  PrivacyAndTermsOfUse,
  Text,
} from '../../../components';
import colors from '../../../constants/colors/colors';
import {TabView, TabBar} from 'react-native-tab-view';
import {globalSpacingStyle} from '../../../constants/space/style';
import {useNavigation} from '@react-navigation/native';

const styles = makeStyles();
const globalStyle = globalSpacingStyle();

const FirstRoute = ({fin, setFin, navigation}: any) => (
  <View style={styles.firstRoute}>
    <View style={globalStyle.space20VT} />
    <ImageBackground
      style={styles.imageBackground}
      source={require('../../../assets/images/BackgroundImage/RegisterBackground.png')}>
      <View>
        <Text
          text="FİN nömrəsi ilə daxil ola bilərsiniz."
          type="regular"
          size="16"
          position="center"
          isGray
        />
        <View style={globalStyle.space20VT} />
        <Container>
          <Input
            placeholder="Fin nömrəsi"
            value={fin}
            onChangeText={setFin}
            autoCapitalize="none"
            keyboardType="default"
          />
          <TouchableOpacity>
            <Text
              text="FİN nömrəsi necə tapa bilərəm?"
              type="regular"
              size="14"
              position="left"
              isBlue
            />
          </TouchableOpacity>
        </Container>
      </View>
      <View style={styles.footer}>
        <Button
          text="Davam et"
          onPress={() => navigation.navigate('Birthday')}
          disable={fin ? false : true}
        />
        <View style={globalStyle.space10VT} />
        <PrivacyAndTermsOfUse
          onPressPrivacy={() => alert('Privacy')}
          onPressTerms={() => alert('Terms')}
        />
        <View style={globalStyle.space30VT} />
      </View>
    </ImageBackground>
  </View>
);

const SecondRoute = ({
  company,
  setCompany,
  voen,
  setVoen,
  telephoneNumber,
  setTelephoneNumber,
  email,
  setEmail,
  navigation,
}: any) => (
  <View style={styles.firstRoute}>
    <View style={globalStyle.space20VT} />
    <ImageBackground
      style={styles.imageBackground}
      source={require('../../../assets/images/BackgroundImage/RegisterBackground.png')}>
      <View>
        <View style={globalStyle.space20VT} />
        <Container>
          <Input
            placeholder="Şirkətin adı"
            value={company}
            onChangeText={setCompany}
            autoCapitalize="none"
            keyboardType="default"
          />
          <Input
            placeholder="VÖEN"
            value={voen}
            onChangeText={setVoen}
            autoCapitalize="none"
            keyboardType="default"
          />
          <PhoneInput
            placeholder="Mobil nömrə"
            value={telephoneNumber}
            onChangeText={setTelephoneNumber}
            keyboardType="numeric"
          />
          <Input
            placeholder="E-poçt"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="default"
          />
        </Container>
      </View>
      <View style={styles.footer}>
        <Button
          text="Davam et"
          onPress={() => navigation.navigate('Otp')}
          disable={!company || !voen || !telephoneNumber || !email}
        />
        <View style={globalStyle.space30VT} />
      </View>
    </ImageBackground>
  </View>
);
const renderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.tabBarColor}}
      style={{backgroundColor: 'white'}}
      renderLabel={({route, focused}) => (
        <Text
          text={route.title}
          size="14"
          type="semiBold"
          color={focused ? colors.tabBarColor : 'gray'}
          textTransform="none"
        />
      )}
    />
  );
};

export default function Register() {
  const initialLayout = {width: Dimensions.get('window').width};
  const [index, setIndex] = useState(0);
  const [fin, setFin] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [voen, setVoen] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [routes] = useState([
    {key: 'first', title: 'Müştəri'},
    {key: 'second', title: 'Tərəfdaş'},
  ]);

  const navigation = useNavigation();

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute fin={fin} setFin={setFin} navigation={navigation} />;
      case 'second':
        return (
          <SecondRoute
            voen={voen}
            setVoen={setVoen}
            company={company}
            setCompany={setCompany}
            email={email}
            setEmail={setEmail}
            navigation={navigation}
            telephoneNumber={phoneNumber}
            setTelephoneNumber={setPhoneNumber}
          />
        );
      case 'second':
      default:
        return null;
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <View style={globalStyle.space30VT} />
        <Text text="Qeydiyyat" type="regular" size="20" position="center" />
        <View style={globalStyle.space20VT} />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    </>
  );
}
