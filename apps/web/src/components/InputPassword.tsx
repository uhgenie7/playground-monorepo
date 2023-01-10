import { forwardRef } from 'react';
import { Input } from '@nextui-org/react';

const NextUIInputPassword = forwardRef<HTMLInputElement, any>(
  ({ ...props }, ref) => {
    return (
      <Input.Password
        css={{
          whiteSpace: 'pre-wrap',
          '.nextui-input-helper-text-container': {
            position: 'relative',
            bottom: '0',
          },
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

NextUIInputPassword.displayName = 'NextUIInputPassword';

export default NextUIInputPassword;
