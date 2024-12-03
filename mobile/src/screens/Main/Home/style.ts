import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.greyBackground,
    },
    containerTransaction: {
      borderRadius: 32,
      width: '100%',
      backgroundColor: colors.whiteText,
      padding: 15,
      alignItems: 'center',
    },
    topContainer: {
      width: '94%',
      height: 80,
      flexDirection: 'row',
      borderRadius: 24,
      backgroundColor: colors.whiteText,
    },
    topContainerLeft: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 20,
      resizeMode: 'cover',
    },
    topContainerMid: {
      width: '60%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    topContainerRight: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    notficatonContainer: {
      width: 50,
      height: 50,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.greyBackground,
    },
    titleContainer: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  });
