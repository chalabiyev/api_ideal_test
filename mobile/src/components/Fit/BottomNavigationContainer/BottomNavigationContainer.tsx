import React, {useRef, useEffect} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {BottomNavigationContainerProps} from './type';
import {
  CreditsIcon,
  HomeIcon,
  InsuranceIcon,
  PartnersIcon,
  PaymentsIcon,
} from '../../../assets';
import Text from '../Text';
import {useNavigation} from '@react-navigation/native';

export default function BottomNavigationContainer(
  props: BottomNavigationContainerProps,
): JSX.Element {
  const {} = props;
  const navigation = useNavigation();
  const styles = makeStyles();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftAndRight}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Transaction')}
          style={styles.navigationBox}>
          <PaymentsIcon />
          <Text text="Ödənişlər" type="regular" size="10" position="center" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationBox}
          onPress={() => navigation.navigate('Partners')}>
          <PartnersIcon />
          <Text text="Partnyorlar" type="regular" size="10" position="center" />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <View style={styles.centerHomeButton}>
          <Animated.View
            style={[
              styles.animationContainer,
              {
                opacity: opacityAnim,
                transform: [{scale: scaleAnim}],
              },
            ]}
          />
          <Animated.View style={styles.iconContainer}>
            <TouchableOpacity
              hitSlop={styles.hitSlop}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Home')}>
              <HomeIcon />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <View style={styles.leftAndRight}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Credits')}
          style={styles.navigationBox}>
          <CreditsIcon />
          <Text text="Kreditlər" type="regular" size="10" position="center" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Insurance')}
          style={styles.navigationBox}>
          <InsuranceIcon />
          <Text text="Sığorta" type="regular" size="10" position="center" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
