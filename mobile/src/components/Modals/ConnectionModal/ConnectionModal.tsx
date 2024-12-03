import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {ConnectionModalProps} from './type';
import Modal from 'react-native-modalbox';
import Text from '../../Fit/Text';
import {useNavigation} from '@react-navigation/native';
import MainButton from '../../Fit/Button';
import {globalSpacingStyle} from '../../../constants/space/style';
import {
  EmailModalIcon,
  FacebookModalIcon,
  InstagramModalIcon,
  TelephoneModalIcon,
  WatsappModalIcon,
  XModalIcon,
} from '../../../assets';
import colors from '../../../constants/colors/colors';
const globalStyle = globalSpacingStyle();
const styles = makeStyles();
export default function ConnectionModal(
  props: ConnectionModalProps,
): JSX.Element {
  const {setState, state} = props;
  const navigation = useNavigation();
  const handleNavigate = () => {
    setState(false);
    setTimeout(() => {
      navigation.navigate('Login');
    }, 300);
  };

  return (
    <Modal
      useNativeDriver
      style={styles.modal}
      swipeToClose={true}
      isOpen={state}
      swipeThreshold={1}
      onClosed={() => setState && setState()}
      coverScreen={true}
      position={'bottom'}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <TelephoneModalIcon />
          </View>
          <Text text="+994 (012) 526-26-25" type="semiBold" size="18" />
        </View>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <EmailModalIcon />
          </View>
          <Text
            text="office@idealkredit.az"
            type="semiBold"
            size="18"
            position="left"
          />
        </View>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <WatsappModalIcon />
          </View>
          <Text
            text="WhatsApp ilə əlaqə"
            type="semiBold"
            size="18"
            position="left"
          />
        </View>
        <View style={globalStyle.space10VT} />
        <Text text="Bizi izləyin" type="semiBold" size="18" position="left" />
        <View style={globalStyle.space10VT} />
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={styles.iconContainer}>
            <FacebookModalIcon />
          </View>
          <View style={styles.iconContainer}>
            <InstagramModalIcon />
          </View>
          <View style={styles.iconContainer}>
            <XModalIcon />
          </View>
        </View>
        <View style={globalStyle.space10VT} />
      </View>
    </Modal>
  );
}
