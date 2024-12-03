import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {DeleteAccountModalProps} from './type';
import Modal from 'react-native-modalbox';
import Text from '../../Fit/Text';
import {useNavigation} from '@react-navigation/native';
import MainButton from '../../Fit/Button';
import {globalSpacingStyle} from '../../../constants/space/style';
const globalStyle = globalSpacingStyle();
const styles = makeStyles();
export default function DeleteAccountModal(
  props: DeleteAccountModalProps,
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
      position={'center'}>
      <View style={styles.container}>
        <Text text="Hesabı Silmək" type="bold" size="18" />
        <View style={globalStyle.space10VT} />
        <Text
          text="Hesabı silmək istədiyinizə əminsinizmi?"
          type="regular"
          size="14"
        />
        <View style={globalStyle.space30VT} />
        <MainButton onPress={handleNavigate} text="Silmək" />
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => setState(false)}>
          <Text text="İmtina" type="regular" size="14" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
