import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';
import {borderRadius, inputHeight, inputWidth} from '../../../constants/size';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    photoContainer: {
      width: '90@s',
      height: '90@s',
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: colors.backgroundColor,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    photoBox: {
      width: '80@s',
      height: '80@s',
      borderRadius: 80,
      backgroundColor: colors.inputBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
