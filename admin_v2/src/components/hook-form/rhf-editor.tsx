import { Controller, useFormContext } from 'react-hook-form';

import type { EditorProps } from '../editor';

// ----------------------------------------------------------------------

type Props = EditorProps & {
  name: string;
};

export function RHFEditor({ name, helperText, ...other }: Props) {
  const {
    control,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  return <></>;
}
