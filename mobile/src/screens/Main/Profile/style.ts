import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.greyBackground,
    },
    topHeader: {
      width: '100%',
      height: '70@s',
      backgroundColor: colors.backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 16,
    },
    box: {
      width: '100%',
      height: '70@s',
      backgroundColor: colors.backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 16,
      marginBottom: '10@s',
    },
    left: {
      width: '95%',
      flexDirection: 'row',
    },
    right: {
      width: '20%',
    },
    navigationContainer: {
      width: '100%',
      alignItems: 'center',
    },
    exitAndDeleteButton: {
      width: '100%',
      height: '70@s',
      backgroundColor: colors.backgroundColor,
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      marginBottom: '10@s',
    },
  });
