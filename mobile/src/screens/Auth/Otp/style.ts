import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';
import {borderRadius} from '../../../constants/size';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    codeFieldContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginLeft: '6@s',
    },
    text: {
      fontSize: '20@s',
      color: colors.greyText,
    },
    cell: {
      width: '40@s',
      height: '50@s',
      fontSize: '18@s',
      borderRadius: borderRadius,
      backgroundColor: colors.inputBackgroundColor,
      textAlign: 'center',
      marginRight: '12@s',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      justifyContent: 'space-between',
      flex: 1,
    },
    topAndBot: {
      alignItems: 'center',
    },
  });
