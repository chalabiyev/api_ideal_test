import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.greyBackground,
    },
    box: {
      width: '96%',
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
  });
