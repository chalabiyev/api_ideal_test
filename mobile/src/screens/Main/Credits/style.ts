import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.greyBackground,
    },
    box: {
      height: '110@s',
      width: '48%',
      borderRadius: 16,
      backgroundColor: colors.splashBackground,
      marginBottom: 20,
    },
    top: {
      height: '20%',
      width: '100%',
      marginLeft: 5,
      marginTop: 5,
    },
    bottom: {
      height: '80%',
      width: '100%',
      alignItems: 'flex-end',
      paddingRight: 10,
    },
    firstBox: {
      borderRadius: 16,
      height: 120,
      width: '100%',
      backgroundColor: colors.splashBackground,
    },
    image: {
      height: '70@s',
      width: '100@s',
      resizeMode: 'contain',
    },
    firstImage: {
      height: '70@s',
      width: '200@s',
      resizeMode: 'contain',
    },
    currentCreditBox: {
      height: '110@s',
      width: '100%',
      backgroundColor: colors.splashBackground,
      borderRadius: 16,
      flexDirection: 'row',
      padding: 10,
      marginBottom: 10,
    },
    contentContainerStyle: {
      paddingVertical: 10,
      paddingBottom: 100,
    },
    secondRouteBoxRight: {
      width: '30%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    secondRouteBoxLeft: {
      width: '70%',
      justifyContent: 'space-evenly',
    },
  });
