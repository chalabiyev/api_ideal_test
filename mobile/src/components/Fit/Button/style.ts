import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = (isPressed: boolean) =>
  ScaledSheet.create({
    container: {
      width: '96%',
      height: '50@s',
      borderRadius: '16@s',
      backgroundColor: isPressed
        ? colors.presseddButton
        : colors.defaultdButton,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    disabled: {
      backgroundColor: colors.disabledButton,
    },
  });
