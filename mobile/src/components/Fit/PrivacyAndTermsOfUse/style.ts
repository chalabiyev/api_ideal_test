import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    headerleft: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
