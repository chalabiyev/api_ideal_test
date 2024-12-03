import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
    },
    tabBar: {
      height: '50@s',
      width: '96%',
      borderRadius: 16,
      flexDirection: 'row',
      backgroundColor: colors.whiteText,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      width: 60,
      height: '40@s',
      borderRadius: 16,
      backgroundColor: colors.blueText,
    },
    tabContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hitSlop: {top: 10, bottom: 10, left: 10, right: 10},
  });
