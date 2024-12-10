import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    box: {
      justifyContent: 'space-between',
      flex: 1,
    },
    topAndBot: {
      alignItems: 'center',
    },
  });
