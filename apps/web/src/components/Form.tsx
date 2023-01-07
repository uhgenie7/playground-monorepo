import { useForm, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';

const Form = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      criteriaMode: 'all',
    },
  });

  const PASSWORD = {
    REQ: '필수값입니다',
    MINMAX: '4자 이상 10자 이하',
    SAME: '아이디와 비밀번호가 같을 수는 없습니다.',
  };

  const { REQ, MINMAX, SAME } = PASSWORD;

  const Array = [REQ, MINMAX, SAME];

  const valid = errors.password?.types;

  console.log(errors.password);
  // Object.values(valid)

  return (
    <form>
      <Controller
        control={control}
        name="id"
        rules={{
          required: {
            value: true,
            message: REQ,
          },
        }}
        render={({ field }) => (
          <>
            <Input
              clearable
              shadow={false}
              status={errors.id ? 'error' : 'primary'}
              color={errors.id ? 'error' : 'primary'}
              label="아이디"
              placeholder="아이디"
              {...field}
            />
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: {
            value: true,
            message: REQ,
          },
          maxLength: {
            value: 10,
            message: MINMAX,
          },
          minLength: {
            value: 4,
            message: MINMAX,
          },
          validate: {
            idSame: (password) => {
              const { id } = getValues();
              return id !== password || SAME;
            },
          },
        }}
        render={({ field }) => (
          <>
            <Input.Password
              clearable
              shadow={false}
              status={errors.password ? 'error' : 'primary'}
              color={errors.password ? 'error' : 'primary'}
              label="비밀번호"
              placeholder="비밀번호"
              {...field}
            />
            {Array.map((message) => {
              return <p key={message}>{message}</p>;
            })}
          </>
        )}
      />
    </form>
  );
};

export default Form;
