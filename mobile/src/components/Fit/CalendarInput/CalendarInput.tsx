import React, {useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {CalendarInputProps} from './type';
import Text from '../Text';
import {Calendar} from '../../../assets';
import colors from '../../../constants/colors/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function CalendarInput(props: CalendarInputProps): JSX.Element {
  const {placeholder, onDateChange} = props;
  const styles = makeStyles();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = (event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set') {
        setSelectedDate(date);
        onDateChange(date);
      }
      setShowDatePicker(false);
    } else if (Platform.OS === 'ios' && date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return placeholder || 'Tarih Seçiniz';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDatePicker} style={styles.birthday}>
        <Text text={formatDate(selectedDate)} type="regular" size="14" isGray />
        <Calendar />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          themeVariant="dark"
          textColor={colors.blueText}
        />
      )}
    </View>
  );
}
