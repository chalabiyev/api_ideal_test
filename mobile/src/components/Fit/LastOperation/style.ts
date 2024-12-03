import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    box: {
      width: '100%',
      height: '60@s',
      flexDirection: 'row',
    },
    boxLeft: {
      width: '25%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      height: '50@s',
      width: '50@s',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#110792',
      borderRadius: 16,
      shadowColor: '#110792',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    boxMid: {
      justifyContent: 'center',
      width: '45%',
      height: '100%',
    },
    boxRight: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      height: '100%',
    },
    divider: {
      width: '96%',
      height: 0.1,
      backgroundColor: colors.greyText,
    },
  });
