import {ScaledSheet, s} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.backgroundColor,
    },
    footer: {
      alignItems: 'center',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'space-between',
    },
    firstRoute: {flex: 1},
    secondRoute: {flex: 1},
  });
