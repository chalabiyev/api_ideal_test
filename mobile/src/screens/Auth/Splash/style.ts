import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../constants/colors/colors';
export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: colors.splashBackground,
    },
    imageBox: {
      paddingLeft: '10@s',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    image: {
      width: '50%',
      height: '60@s',
    },
    slide: {
      width: '350@s',
      height: '250@s',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    sliderImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
