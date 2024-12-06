import React from 'react';
import {makeStyles} from './style';
import {OperationStickProps} from './type';
import {TouchableOpacity, View} from 'react-native';
import OperationsStickData from '../../../mockupData/OperationsStickData';
import {useNavigation} from '@react-navigation/native';
import Text from '../Text';

export default function OperationStick(
  props: OperationStickProps,
): JSX.Element {
  const {onPress} = props;
  const styles = makeStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {OperationsStickData.map(item => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.navigateTo)}
          key={item.id}
          style={styles.box}>
          {item.icon}
          <Text text={item.title} size="12" type="regular" />
        </TouchableOpacity>
      ))}
    </View>
  );
}
