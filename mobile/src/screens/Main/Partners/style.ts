import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.greyBackground,
    },
    topContainer: {
      width: '100%',
      height: '400@s',
      backgroundColor: colors.splashBackground,
      borderBottomRightRadius: 64,
    },
    fastCreditContainer: {
      height: '70@s',
      width: '300@s',
      backgroundColor: '#DFFFFD',
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      shadowColor: '#DFFFFD',
      shadowOffset: {width: 3, height: 0},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
      paddingLeft: 10,
      justifyContent: 'center',
    },
    partnersContainer: {
      height: '70@s',
      width: '260@s',
      backgroundColor: '#DFDEFF',
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      shadowColor: '#DFDEFF',
      shadowOffset: {width: 3, height: 0},
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
      paddingLeft: 10,
      justifyContent: 'center',
    },

    autoContainer: {
      height: '70@s',
      width: '220@s',
      backgroundColor: '#FFF2EB',
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      shadowColor: '#FFF2EB',
      shadowOffset: {width: 3, height: 0},
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
      paddingLeft: 10,
      justifyContent: 'center',
    },
    calendarButton: {
      height: '40@s',
      width: '180@s',
      borderRadius: 8,
      backgroundColor: colors.backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    bottomContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    left: {
      width: '20%',
      alignItems: 'center',
    },
    mid: {
      width: '60%',
      alignItems: 'center',
    },
    right: {
      width: '20%',
      alignItems: 'center',
    },
  });
