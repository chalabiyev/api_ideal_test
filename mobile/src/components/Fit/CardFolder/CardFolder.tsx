import React, {useRef, useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {CardFolderProps} from './type';
import {s, scale} from 'react-native-size-matters';

export default function CardFolder(props: CardFolderProps): JSX.Element {
  const {onPressCredits, onPressInsurance} = props;
  const styles = makeStyles();
  const [activeCard, setActiveCard] = useState('credit');
  const creditCardScale = useRef(new Animated.Value(1)).current;
  const insuranceCardScale = useRef(new Animated.Value(1)).current;

  const animateCard = (cardType: string) => {
    if (cardType === 'credit') {
      Animated.parallel([
        Animated.timing(creditCardScale, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(insuranceCardScale, {
          toValue: 0.9,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      if (onPressCredits) {
        onPressCredits();
      }
    } else if (cardType === 'insurance') {
      Animated.parallel([
        Animated.timing(insuranceCardScale, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(creditCardScale, {
          toValue: 0.9,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
      if (onPressInsurance) {
        onPressInsurance();
      }
    }
    setActiveCard(cardType);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => animateCard('credit')}
        activeOpacity={0.9}
        style={{
          height: scale(170),
          width: scale(280),
          zIndex: activeCard === 'credit' ? 2 : 1,
          position: activeCard === 'credit' ? 'relative' : 'absolute',
          transform: [{translateX: activeCard === 'credit' ? 30 : -60}],
        }}>
        <Animated.Image
          source={require('../../../assets/images/Cards/CreditCards.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            transform: [{scale: creditCardScale}],
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => animateCard('insurance')}
        activeOpacity={0.9}
        style={{
          height: scale(170),
          width: scale(280),
          zIndex: activeCard === 'insurance' ? 2 : 1,
          position: activeCard === 'insurance' ? 'relative' : 'absolute',
          transform: [{translateX: activeCard === 'insurance' ? 30 : -60}],
        }}>
        <Animated.Image
          source={require('../../../assets/images/Cards/InsuranceCards.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            transform: [{scale: insuranceCardScale}],
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
