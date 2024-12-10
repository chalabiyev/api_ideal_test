import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';
import {borderRadius, inputHeight, inputWidth} from '../../../constants/size';

export const makeStyles = () =>
  ScaledSheet.create({
    dropDown: {
      borderRadius: borderRadius,
      width: inputWidth,
      backgroundColor: colors.inputBackgroundColor,
      height: inputHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: '10@s',
    },
    dropDownMenu: {
      marginTop: 5,
      backgroundColor: '#fff',
      borderRadius: 4,
      padding: 5,
    },
    dropDownItem: {
      padding: 10,
    },
  });
