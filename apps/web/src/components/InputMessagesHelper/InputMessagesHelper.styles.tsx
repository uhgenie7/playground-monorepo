import { Text, styled } from '@nextui-org/react';

export const StyledHelperText = styled(Text, {
  margin: '0.125rem 0 0 0.625rem',
  fontSize: '$space$5',
  variants: {
    type: {
      primary: {
        color: '$primary',
      },
      error: {
        color: '$error',
      },
      gray: {
        color: '$secondary',
      },
    },
  },
});
