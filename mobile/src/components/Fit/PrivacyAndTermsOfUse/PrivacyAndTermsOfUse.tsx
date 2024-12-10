import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {PrivacyAndTermsOfUseProps} from './type';
import {useNavigation} from '@react-navigation/native';
import Text from '../Text';
const styles = makeStyles();
export default function PrivacyAndTermsOfUse(
  props: PrivacyAndTermsOfUseProps,
): JSX.Element {
  const {onPressPrivacy, onPressTerms} = props;
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Text
          text="Qeydiyyatdan keçməklə mən "
          type="regular"
          size="14"
          position="center"
          isGray
        />
        <TouchableOpacity onPress={() => onPressTerms()}>
          <Text
            text="istifadə şərtləri "
            type="regular"
            size="14"
            position="center"
            underline
          />
        </TouchableOpacity>
        <Text text="və" type="regular" size="14" position="center" isGray />
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPressPrivacy()}>
          <Text
            text="məxfilik siyasəti  "
            type="regular"
            size="14"
            position="center"
            underline
          />
        </TouchableOpacity>
        <Text
          text="ilə razılaşıram.  "
          type="regular"
          size="14"
          position="center"
          isGray
        />
      </View>
    </>
  );
}
