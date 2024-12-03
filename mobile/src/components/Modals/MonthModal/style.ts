import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    modal: {
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      height: null,
      width: '96%',
      backgroundColor: colors.backgroundColor,
    },
  });
