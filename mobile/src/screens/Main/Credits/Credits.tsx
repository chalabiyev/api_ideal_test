import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {makeStyles} from './style';
import {BottomNavigationContainer, Container, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {TabBar, TabView} from 'react-native-tab-view';
import CreditsData from '../../../mockupData/CreditsData';
import CurrentCreditData from '../../../mockupData/CurrentCreditData';
import {useNavigation} from '@react-navigation/native';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const {width} = Dimensions.get('window');
const FirstRoute = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.box}
      onPress={() => navigation.navigate('CreditsInfo', {CreditsData: item})}>
      <View style={styles.top}>
        <Text
          text={item.title}
          type="regular"
          size="14"
          position="left"
          isWhite
        />
      </View>
      <View style={styles.bottom}>
        <Image source={item.image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const numColumns = 2;

  const filteredData =
    CreditsData && CreditsData.length > 0 ? CreditsData.slice(1) : [];

  return (
    <View style={styles.container}>
      <View style={globalStyle.space20VT} />
      <ScrollView>
        {CreditsData.length > 0 && (
          <Container>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.firstBox}
              onPress={() =>
                navigation.navigate('CreditsInfo', {
                  CreditsData: CreditsData[0],
                })
              }>
              <View style={styles.top}>
                <Text
                  text={CreditsData[0].title}
                  type="regular"
                  size="14"
                  position="left"
                  isWhite
                />
              </View>
              <View style={styles.bottom}>
                <Image
                  source={CreditsData[0].image}
                  style={styles.firstImage}
                />
              </View>
            </TouchableOpacity>
            <View style={globalStyle.space20VT} />
          </Container>
        )}
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{paddingHorizontal: 16}}
        />
      </ScrollView>
    </View>
  );
};
const SecondRoute = () => {
  const renderItem = ({item}) => (
    <View style={styles.currentCreditBox}>
      <View style={styles.secondRouteBoxLeft}>
        <View>
          <Text
            text={item.title}
            type="semiBold"
            size="16"
            position="left"
            isWhite
          />
          <Text
            text={item.price + ' ₼'}
            type="semiBold"
            size="14"
            position="left"
            isWhite
          />
        </View>
        <View>
          <Text
            text={item.date}
            type="semiBold"
            size="14"
            position="left"
            isWhite
          />
        </View>
      </View>
      <View style={styles.secondRouteBoxRight}>
        <Text
          text={item.status}
          type="semiBold"
          size="14"
          position="left"
          color={
            item.status === 'İmtina'
              ? 'red'
              : item.status === 'Təsdiqlənib'
              ? 'green'
              : 'yellow'
          }
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={globalStyle.space20VT} />

      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={CurrentCreditData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </Container>
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
export default function Credits() {
  const initialLayout = {width: Dimensions.get('window').width};
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Müraciət et'},
    {key: 'second', title: 'Cari kreditlər'},
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
        <Text text="Kreditlər" type="semiBold" size="20" position="center" />
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
