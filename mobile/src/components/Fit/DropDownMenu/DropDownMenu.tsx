import React, {useState, useRef} from 'react';
import {TouchableOpacity, View, FlatList, Animated, Easing} from 'react-native';
import {makeStyles} from './style';
import {DropDownMenuProps} from './type';
import {ArrowBot, ArrowUp} from '../../../assets';
import Text from '../Text';

const styles = makeStyles();

export default function DropDownMenu(props: DropDownMenuProps): JSX.Element {
  const {text, selectedItem, onSelect, data} = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(dropdownHeight, {
        toValue: data.length * 40,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelectItem = (item: string) => {
    onSelect(item);
    toggleDropdown();
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.dropDown}
        onPress={toggleDropdown}>
        <Text text={selectedItem || text} type="regular" size="12" isGray />
        {isOpen ? <ArrowUp /> : <ArrowBot />}
      </TouchableOpacity>

      {isOpen && (
        <Animated.View style={[styles.dropDownMenu, {height: dropdownHeight}]}>
          <FlatList
            nestedScrollEnabled={true}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.dropDownItem}
                onPress={() => handleSelectItem(item.label)}>
                <Text text={item.label} type="regular" size="12" />
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
}
