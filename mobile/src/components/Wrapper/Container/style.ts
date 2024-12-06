import {ScaledSheet} from 'react-native-size-matters';

export const makeStyles = () =>
  ScaledSheet.create({
    container: {
      paddingLeft: '12@s',
      paddingRight: '12@s',
    },
  });

