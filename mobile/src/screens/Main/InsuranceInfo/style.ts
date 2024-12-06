import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.greyBackground,
    },
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    button: {width: '50%'},
  });
