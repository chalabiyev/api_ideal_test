import {ScaledSheet} from 'react-native-size-matters';
import {borderRadius, inputHeight, inputWidth} from '../../../constants/size';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    input: {
      backgroundColor: colors.inputBackgroundColor,
      borderRadius: borderRadius,
      marginVertical: '12@s',
      width: '100%',
      height: inputHeight,
      fontSize: '12@s',
      color: colors.greyText,
      paddingHorizontal: '10@s',
    },
  });
