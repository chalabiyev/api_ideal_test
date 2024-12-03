import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    modal: {
      borderRadius: 6,
      justifyContent: 'center',
      height: null,
      width: '100%',
      backgroundColor: colors.backgroundColor,
    },
    container: {
      alignItems: 'flex-start',
      padding: 20,
    },
    card: {
      width: '100%',
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: '50@s',
      height: '50@s',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.defaultdButton,
      borderRadius: 6,
      marginRight: 10,
    },
  });
