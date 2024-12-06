import React from 'react';
import {View} from 'react-native';
import {makeStyles} from './style';
import {MonthModalProps} from './type';
import Modal from 'react-native-modalbox';
import Text from '../../Fit/Text';
import {useNavigation} from '@react-navigation/native';
export default function MonthModal(props: MonthModalProps): JSX.Element {
  const {setState, state} = props;
  const styles = makeStyles();
  const navigation = useNavigation();
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
      <View style={{alignItems: 'center'}}>
        <Text text="aldksfhbg" type="regular" size="20" />
        <Text text="aldksfhbg" type="regular" size="20" />
        <Text text="aldksfhbg" type="regular" size="20" />
        <Text text="aldksfhbg" type="regular" size="20" />
        <Text text="aldksfhbg" type="regular" size="20" />
      </View>
    </Modal>
  );
}
