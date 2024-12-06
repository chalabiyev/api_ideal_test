import {ScaledSheet} from 'react-native-size-matters';
import {inputHeight, inputWidth} from '../../../constants/size';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackgroundColor,
      marginVertical: '12@s',
      borderRadius: '8@s',
      width: inputWidth,
      height: inputHeight,
    },
    input: {
      flex: 1,
      paddingHorizontal: '10@s',
      fontSize: '12@s',
      color: colors.greyText,
    },
  });
