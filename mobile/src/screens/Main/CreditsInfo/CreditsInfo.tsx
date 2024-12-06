import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, ScrollView} from 'react-native';
import {makeStyles} from './style';
import {BottomNavigationContainer, Container, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {TabBar, TabView} from 'react-native-tab-view';
import MainButton from '../../../components/Fit/Button/MainButton';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const {width} = Dimensions.get('window');

const FirstRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={globalStyle.space20VT} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View style={styles.box}>
            <Text text="Tələblər" type="semiBold" size="16" />
            <View style={globalStyle.space10VT} />
            <Text text="Yaşı" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text text="18-80" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text text="Tələb olunan sənəd" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text text="Gəlirləri təsdiq edən sənəd" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text text="Zamin" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text text="Tələb edilə bilər" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text text="Girov" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text
              text="Kredit məbləğinin həcmindən asılı olaraq daşınar və ya daşınmaz əmlak girovu tələb oluna bilər"
              type="regular"
              size="14"
            />
          </View>
          <View style={globalStyle.space10VT} />
          <View style={styles.box}>
            <Text text="Şərtlər" type="semiBold" size="16" />
            <View style={globalStyle.space10VT} />
            <Text text="Kredit məbləği" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text text="100-100000 AZN/USD" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text text="Kredit müddəti" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text text="3-60 ay" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text text="Faiz dərəcəsi" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text text="illik 22-36%" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text
              text="Faktiki illik faiz dərəcəsi (FİFD)"
              type="regular"
              size="12"
              isGray
            />
            <View style={globalStyle.space3VT} />
            <Text text="illik 22-36%" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text text="Komissiya xərci" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text text="0%-dən başlayaraq" type="regular" size="14" />
            <View style={globalStyle.space10VT} />
            <Text text="Ödəniş növü" type="regular" size="12" isGray />
            <View style={globalStyle.space3VT} />
            <Text
              text="anuitet (aylıq bərabər hissələrlə)."
              type="regular"
              size="14"
            />
            <View style={globalStyle.space10VT} />
            <Text
              text="Tələb edilən sənədlər"
              type="regular"
              size="12"
              isGray
            />
            <View style={globalStyle.space3VT} />
            <Text
              text="Şəxsiyyət vəsiqəsinin surəti (vaxtı keçmiş şəxsiyyət vəsiqəsi qəbul edilmir)"
              type="regular"
              size="14"
            />
          </View>
        </Container>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <MainButton
              text="Müraciət et"
              onPress={() => navigation.navigate('Credits')}
            />
          </View>
        </View>
        <View style={globalStyle.space50VT} />
        <View style={globalStyle.space50VT} />
      </ScrollView>
    </View>
  );
};

const SecondRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: colors.greyBackground}}>
      <View style={globalStyle.space20VT} />
      <Container>
        <View style={{borderRadius: 8, overflow: 'hidden'}}>
          <Video
            paused={true}
            source={require('../../../assets/video/idealKredit.mp4')}
            style={{width: '100%', height: 200}}
            controls={true}
            resizeMode="cover"
          />
        </View>
        <View style={globalStyle.space10VT} />
        <Text text="Nağd pul kreditləri" type="semiBold" size="16" />
        <Text
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis auctor dui ac auctor. Nullam commodo augue magna, sit amet scelerisque velit vehicula in. Duis egestas felis quis nisl euismod volutpat. Pellentesque nec mauris dui. Sed eget metus sapien.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis auctor dui ac auctor"
          type="regular"
          size="12"
        />
      </Container>
      <View
        style={{
          marginTop: 10,
          width: '100%',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <View style={{width: '50%'}}>
          <MainButton
            text="Müraciət et"
            onPress={() => navigation.navigate('Credits')}
          />
        </View>
      </View>
    </View>
  );
};

const renderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.tabBarColor}}
      style={{backgroundColor: colors.greyBackground}}
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

export default function CreditsInfo({route}) {
  const initialLayout = {width: Dimensions.get('window').width};
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Yazılı məlumat'},
    {key: 'second', title: 'Video məlumat'},
  ]);

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      default:
        return null;
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.greyBackground}} />
      <View style={styles.container}>
        <Text
          text={route.params.CreditsData.title}
          type="semiBold"
          size="20"
          position="center"
        />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <BottomNavigationContainer />
        </View>
      </View>
    </>
  );
}
