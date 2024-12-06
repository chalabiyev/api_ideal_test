import React, {useEffect, useRef, useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {makeStyles} from './style';
import {CustomTabViewProps} from './type';
import Text from '../Text';
import colors from '../../../constants/colors/colors';

const styles = makeStyles();

export default function CustomTabView(props: CustomTabViewProps): JSX.Element {
  const {tabs, content} = props;
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const tabIndicator = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.key === activeTab);
    Animated.spring(tabIndicator, {
      toValue: index * 100,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabs]);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            hitSlop={styles.hitSlop}
            key={tab.key}
            style={[styles.tabItem, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}>
            <Text
              text={tab.title}
              type="semiBold"
              size="14"
              color={
                activeTab === tab.key ? colors.whiteText : colors.tabBarColor
              }
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabContent}>{content[activeTab]}</View>
    </View>
  );
}
