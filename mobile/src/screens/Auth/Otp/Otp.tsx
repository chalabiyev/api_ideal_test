import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  View,
  Text as NativeText,
  TouchableOpacity,
} from 'react-native';
import {makeStyles} from './style';
import {MainHeader, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import MainButton from '../../../components/Fit/Button';
import {globalSpacingStyle} from '../../../constants/space/style';
import {useNavigation} from '@react-navigation/native';
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const CELL_COUNT = 6;
export default function Otp() {
  const navigation = useNavigation();
  const route = useRoute();
  const [code, setCode] = useState<string>('');
  const [timerValue, setIncrementTimer] = useState(30);
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [propsOTP, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const sendCodeAgain = () => {
    setCode('');
    setIncrementTimer(90);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      timerValue > 0 && setIncrementTimer(timerValue - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerValue]);

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <View style={globalStyle.space30VT} />
        <View style={styles.box}>
          <View style={styles.topAndBot}>
            <Text text="Təsdiq kodunu daxil edin" type="regular" size="20" />
            <View style={globalStyle.space20VT} />
            <Text
              text="Sizin +994501234567 nömrənizə SMS kod göndərdik"
              type="regular"
              size="12"
              isGray
            />
            <View style={globalStyle.space30VT} />
            <CodeField
              autoFocus
              ref={ref}
              {...propsOTP}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={Platform.select({
                android: 'sms-otp',
                default: 'one-time-code',
              })}
              testID="my-code-input"
              renderCell={({index, symbol, isFocused}) => (
                <View key={index} style={styles.cell}>
                  <NativeText
                    style={[styles.text]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </NativeText>
                </View>
              )}
            />
            <View style={globalStyle.space30VT} />
            <TouchableOpacity
              onPress={sendCodeAgain}
              disabled={timerValue !== 0}>
              <Text
                text={
                  timerValue !== 0
                    ? 'Birdəfəlik şifrə ' +
                      timerValue.toString() +
                      ' saniyədən sonra bitəcək '
                    : 'Yenilə'
                }
                type="semiBold"
                size="16"
                isGray
              />
            </TouchableOpacity>
          </View>
          <View style={styles.topAndBot}>
            <MainButton
              onPress={() => {
                navigation.navigate('Agreements');
              }}
              text="Davam et"
              disable={code.length !== CELL_COUNT}
            />
            <View style={globalStyle.space30VT} />
          </View>
        </View>
      </View>
    </>
  );
}
