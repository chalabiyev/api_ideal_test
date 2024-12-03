import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {makeStyles} from './style';
import {
  Container,
  DropDownMenu,
  Input,
  MainHeader,
  Text,
} from '../../../components';
import colors from '../../../constants/colors/colors';
import {globalSpacingStyle} from '../../../constants/space/style';
import MainButton from '../../../components/Fit/Button/MainButton';
import {useNavigation} from '@react-navigation/native';

const styles = makeStyles();
const globalStyle = globalSpacingStyle();

export default function BankInformations() {
  const navigation = useNavigation();
  const [bank, setBank] = useState<string>('');
  const [voen, setVoen] = useState<string>('');
  const [customerAccount, setCustomerAccount] = useState('');
  const [reporterAccount, setReporterAccount] = useState('');
  const [code, setCode] = useState('');
  const [selectedBankVoen, setSelectedBankVoen] = useState<string | null>(null);
  const [selectedSwift, setSelectedSwift] = useState<string | null>(null);

  const isButtonDisabled =
    !bank ||
    !voen ||
    !customerAccount ||
    !code ||
    !reporterAccount ||
    !selectedBankVoen ||
    !selectedSwift;

  const handleButtonPress = () => {
    if (!isButtonDisabled) {
      navigation.navigate('Password');
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.backgroundColor}} />
      <MainHeader />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Text
            text="Bank məlumatları"
            type="regular"
            size="20"
            position="center"
          />
          <Container>
            <View style={globalStyle.space20VT} />
            <Input
              placeholder="VÖEN"
              value={voen}
              onChangeText={setVoen}
              autoCapitalize="none"
              keyboardType="default"
            />
            <Input
              placeholder="Bank"
              value={bank}
              onChangeText={setBank}
              autoCapitalize="none"
              keyboardType="default"
            />
            <Input
              placeholder="Müştəri hesabı"
              value={customerAccount}
              onChangeText={setCustomerAccount}
              autoCapitalize="none"
              keyboardType="default"
            />
            <Input
              placeholder="Müxbir hesab"
              value={reporterAccount}
              onChangeText={setReporterAccount}
              autoCapitalize="none"
              keyboardType="default"
            />
            <Input
              placeholder="Kod"
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
              keyboardType="default"
            />
            <DropDownMenu
              data={[
                {id: 1, label: 'Option 1'},
                {id: 2, label: 'Option 2'},
                {id: 3, label: 'Option 3'},
                {id: 4, label: 'Option 4'},
              ]}
              selectedItem={selectedBankVoen}
              onSelect={setSelectedBankVoen}
              text="Bank VÖEN"
            />
            <View style={globalStyle.space15VT} />
            <DropDownMenu
              data={[
                {id: 1, label: 'Option 1'},
                {id: 2, label: 'Option 2'},
                {id: 3, label: 'Option 3'},
                {id: 4, label: 'Option 4'},
              ]}
              selectedItem={selectedSwift}
              onSelect={setSelectedSwift}
              text="SWIFT"
            />
          </Container>
          <View style={globalStyle.space15VT} />
          <View style={{alignItems: 'center'}}>
            <MainButton
              text="Davam et"
              onPress={handleButtonPress}
              disable={isButtonDisabled}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
