import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      width: '95%',
      height: '60@s',
      borderRadius: 16,
      backgroundColor: colors.whiteText,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
    },
    navigationBox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '50%',
    },
    leftAndRight: {
      width: '40%',
      height: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    center: {
      width: '20%',
      height: '100%',
    },
    centerHomeButton: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -20,
    },
    iconContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.blueText,
      borderRadius: 24,
    },
    animationContainer: {
      position: 'absolute',
      width: '100@s',
      height: '100@s',
      borderRadius: 50,
      backgroundColor: colors.blueText,
    },
    hitSlop: {top: 15, bottom: 15, left: 15, right: 15},
  });
