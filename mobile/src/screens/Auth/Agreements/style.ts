import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
    },
    agreementsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      marginBottom: '30@s',
    },
    agreementsContainerLeft: {
      width: '15%',
      alignItems: 'center',
    },
    agreementsContainerRight: {
      width: '85%',
      alignItems: 'center',
    },
    checkBox: {
      height: 25,
      width: 25,
      borderRadius: 8,
      borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedCheckBox: {
      height: 25,
      width: 25,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      backgroundColor: colors.defaultButtonSkyBlue,
    },
  });
