import colors from '../../../constants/colors/colors';
import {
  fontSize10,
  fontSize12,
  fontSize14,
  fontSize16,
  fontSize18,
  fontSize20,
  fontSize24,
  fontSize36,
  fontSize8,
} from '../../../constants/size';
import {ScaledSheet} from 'react-native-size-matters';
import Typography from '../../../helper/typography';

type makeStylesProps = {
  isBlue: boolean;
  isGray: boolean;
  isWhite: boolean;
  isDisabled: boolean;
};

export const makeStyles = ({
  isBlue,
  isGray,
  isWhite,
  isDisabled,
}: makeStylesProps) =>
  ScaledSheet.create({
    container: {
      marginVertical: '8@s',
    },
    semiBold: {
      ...Typography.semiBold,
      color: isWhite
        ? colors.whiteText
        : isBlue
        ? colors.blueText
        : isGray
        ? colors.greyText
        : 'black' && isDisabled
        ? colors.disabledText
        : 'black',
    },
    bold: {
      ...Typography.bold,
      color: isWhite
        ? colors.whiteText
        : isBlue
        ? colors.blueText
        : isGray
        ? colors.greyText
        : 'black' && isDisabled
        ? colors.disabledText
        : 'black',
    },
    regular: {
      ...Typography.regular,
      color: isWhite
        ? colors.whiteText
        : isBlue
        ? colors.blueText
        : isGray
        ? colors.greyText
        : 'black' && isDisabled
        ? colors.disabledText
        : 'black',
    },
    size8: {
      fontSize: fontSize8,
    },
    size10: {
      fontSize: fontSize10,
    },
    size12: {
      fontSize: fontSize12,
    },
    size14: {
      fontSize: fontSize14,
    },
    size16: {
      fontSize: fontSize16,
    },
    size18: {
      fontSize: fontSize18,
    },
    size20: {
      fontSize: fontSize20,
    },
    size24: {
      fontSize: fontSize24,
    },
    size36: {
      fontSize: fontSize36,
    },
    center: {
      textAlign: 'center',
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },
    underline: {
      textDecorationLine: 'underline',
      textDecorationColor: colors.greyText,
    },
  });
