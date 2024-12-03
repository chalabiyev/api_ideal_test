import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      width: '94%',
      height: '65@s',
      backgroundColor: colors.whiteText,
      borderRadius: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    box: {
      width: '22%',
      height: '100%',
      justifyContent: 'space-between',
      paddingVertical: 5,
      alignItems: 'center',
    },
  });
