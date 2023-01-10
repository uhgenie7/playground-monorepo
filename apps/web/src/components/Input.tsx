import { forwardRef, PropsWithoutRef, RefAttributes } from 'react';
import { Input } from '@nextui-org/react';

const NextUIInput = forwardRef<HTMLInputElement, any>(({ ...props }, ref) => {
  return (
    <Input
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
});

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

NextUIInput.displayName = 'NextUIInput';
NextUIInputPassword.displayName = 'NextUIInputPassword';

type InputComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Password: typeof NextUIInputPassword;
};

export default NextUIInput as InputComponent<HTMLInputElement, any>;
