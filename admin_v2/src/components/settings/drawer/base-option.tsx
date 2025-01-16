import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from '@mui/material/ButtonBase';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

import { SvgColor } from '../../svg-color';

// ----------------------------------------------------------------------

type Props = ButtonBaseProps & {
  icon: string;
  label: string;
  selected: boolean;
  tooltip?: string;
};

export function BaseOption({ icon, label, tooltip, selected, ...other }: Props) {
  const theme = useTheme();
  return (
    <ButtonBase
      disableRipple
      sx={{
        px: 1,
        cursor: 'pointer',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      {...other}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: { sm: 0.9 },
          px: { sm: 1 },
          borderRadius: { sm: 1.5 },
          cursor: { sm: 'pointer' },
          bgcolor: { sm: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
        }}
      >
        <SvgColor src={`${CONFIG.site.basePath}/assets/icons/setting/ic-${icon}.svg`} />
        <Switch name={label} size="small" color="default" checked={selected} sx={{ mr: -0.75 }} />
      </Box>
    </ButtonBase>
  );
}
