import React from 'react';
import {View} from 'react-native';
import {makeStyles} from './style';
import {LastOperationProps} from './type';
import Text from '../Text';
import {globalSpacingStyle} from '../../../constants/space/style';
import {
  InsurancePaymentIcon,
  CreditPaymentIcon,
  IncomeIcon,
} from '../../../assets';

const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function LastOperation(props: LastOperationProps): JSX.Element {
  const {item} = props;

  const renderIcon = (type: string) => {
    switch (type) {
      case 'insurance':
        return <InsurancePaymentIcon />;
      case 'credit':
        return <CreditPaymentIcon />;
      case 'income':
        return <IncomeIcon />;
      default:
        return null;
    }
  };

  const getIconContainerStyle = (type: string) => {
    switch (type) {
      case 'insurance':
        return {
          ...styles.iconContainer,
          backgroundColor: '#157FBB',
          shadowColor: '#157FBB',
        };
      case 'credit':
        return {
          ...styles.iconContainer,
          backgroundColor: '#110792',
          shadowColor: '#110792',
        };
      case 'income':
        return {
          ...styles.iconContainer,
          backgroundColor: '#A0D468',
          shadowColor: '#A0D468',
        };
      default:
        return styles.iconContainer;
    }
  };

  return (
    <>
      <View style={styles.box}>
        <View style={styles.boxLeft}>
          <View style={getIconContainerStyle(item.type)}>
            {renderIcon(item.type)}
          </View>
        </View>
        <View style={styles.boxMid}>
          <Text text={item.title} type="semiBold" size="16" />
          <Text text="14.03.2024" type="regular" size="12" isGray />
        </View>
        <View style={styles.boxRight}>
          <Text text={item.price + '₼'} type="semiBold" size="16" />
          <Text text="14.03.2024" type="regular" size="12" isGray />
        </View>
      </View>
    </>
  );
}
