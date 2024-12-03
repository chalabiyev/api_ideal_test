import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {Button, Container, MainHeader, Text} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import {useNavigation} from '@react-navigation/native';
import {Check} from '../../../assets';

const globalStyle = globalSpacingStyle();

export default function Login() {
  const navigation = useNavigation();
  const [agreements, setAgreements] = useState([
    {
      id: 1,
      text: 'İstifadəçi identifikasiya üçün E-GOV sistemi vasitəsilə şəxsiyyəti vəsiqəsi məlumatlarımım İdeal Kredit-ə təqdim edilməsinə razılıq verirəm',
      isChecked: false,
    },
    {
      id: 2,
      text: 'İstifadəçi identifikasiyası üçün video qeydiyyata razılıq verirəm',
      isChecked: false,
    },
  ]);

  const toggleCheckbox = id => {
    setAgreements(prevAgreements =>
      prevAgreements.map(agreement =>
        agreement.id === id
          ? {...agreement, isChecked: !agreement.isChecked}
          : agreement,
      ),
    );
  };

  const allChecked = agreements.every(agreement => agreement.isChecked);

  const styles = makeStyles();

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <View style={globalStyle.space30VT} />
        <Text
          text="Təqbiqdən istifadə etmək üçün tələb olunan razılıqlar"
          type="regular"
          size="20"
          position="center"
        />
        <View style={globalStyle.space30VT} />
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <Container>
              {agreements.map(agreement => (
                <View key={agreement.id} style={styles.agreementsContainer}>
                  <View style={styles.agreementsContainerLeft}>
                    <TouchableOpacity
                      onPress={() => toggleCheckbox(agreement.id)}
                      style={[
                        styles.checkBox,
                        agreement.isChecked && styles.selectedCheckBox,
                      ]}>
                      {agreement.isChecked && <Check />}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.agreementsContainerRight}>
                    <Text
                      text={agreement.text}
                      type="regular"
                      size="12"
                      position="left"
                    />
                  </View>
                </View>
              ))}
            </Container>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              text="Davam et"
              disable={!allChecked}
              onPress={() => navigation.navigate('SimaSignature')}
            />
            <View style={globalStyle.space30VT} />
          </View>
        </View>
      </View>
    </>
  );
}
