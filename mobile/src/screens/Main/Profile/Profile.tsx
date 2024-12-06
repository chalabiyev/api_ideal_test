import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {makeStyles} from './style';
import {
  BottomNavigationContainer,
  ConnectionModal,
  Container,
  DeleteAccontModal,
  ExitModal,
  Text,
} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {DeleteIcon, ExitIcon, RightArrowIcon} from '../../../assets';
import ProfileStickData from '../../../mockupData/ProfileStickData';
import {useNavigation} from '@react-navigation/native';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function Profile() {
  const [isExitModal, setIsExitModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isConnectionModal, setIsConnectionModal] = useState(false);
  const navigation = useNavigation();
  const toggleConnectionModal = () => {
    setIsConnectionModal(!isConnectionModal);
  };
  const toggleDeleteModal = () => {
    setIsDeleteModal(!isDeleteModal);
  };
  const toggleExitModal = () => {
    setIsExitModal(!isExitModal);
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (item.title === 'Əlaqə') {
          toggleConnectionModal();
        } else if (item.navigateTo) {
          navigation.navigate(item.navigateTo);
        }
      }}
      style={styles.box}>
      <View style={styles.left}>
        {item.icon}
        <Text text={`   ${item.title}`} type="regular" size="16" />
      </View>
      <View style={styles.right}>
        <RightArrowIcon />
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.greyBackground}} />
      <View style={styles.container}>
        <DeleteAccontModal state={isDeleteModal} setState={setIsDeleteModal} />
        <ExitModal state={isExitModal} setState={setIsExitModal} />
        <ConnectionModal
          state={isConnectionModal}
          setState={setIsConnectionModal}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <View style={styles.topHeader}>
              <Text text="Elşən Quliyev" type="regular" size="16" />
              <Text text="1FIN23A" type="semiBold" size="16" />
            </View>
            <View style={globalStyle.space30VT} />
            <FlatList
              data={ProfileStickData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <View style={globalStyle.space30VT} />
            <TouchableOpacity
              onPress={toggleExitModal}
              style={styles.exitAndDeleteButton}>
              <ExitIcon />
              <Text text="Çıxış" type="semiBold" size="16" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleDeleteModal}
              style={styles.exitAndDeleteButton}>
              <DeleteIcon />
              <Text
                text="Hesabı sil"
                type="semiBold"
                size="16"
                color="#A76E6E"
              />
            </TouchableOpacity>
          </Container>
          <View style={globalStyle.space50VT} />
          <View style={globalStyle.space50VT} />
        </ScrollView>
        <View style={styles.navigationContainer}>
          <BottomNavigationContainer />
        </View>
      </View>
    </>
  );
}
