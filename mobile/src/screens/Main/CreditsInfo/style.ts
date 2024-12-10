import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.greyBackground,
    },
    box: {
      width: '100%',
      padding: 10,
      backgroundColor: '#DCDCDC',
      borderRadius: 16,
    },
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    button: {width: '50%'},
  });
