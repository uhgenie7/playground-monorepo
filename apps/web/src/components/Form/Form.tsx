import type { ChangeEvent } from 'react';
import { Button, Grid, Col, Row } from '@nextui-org/react';
import {
  useController,
  useForm,
  ValidateResult,
  SubmitHandler,
  ControllerRenderProps,
} from 'react-hook-form';
import NextUIInput from '../Input';
import InputMessagesHelper from '../InputMessagesHelper';
import NextUIInputPassword from '../InputPassword';
import REGEXP from '@/constants/regexp';
import {
  VALIDATION_ERRORS,
  REQUIRED,
  PLACEHOLDER,
  ID_VALID_MESSAGE,
  PASSWORD_VALID_MESSAGE,
} from '@/constants/messages';
import type { ISignupForm, ISignupInputValues } from '@/types/signup';
import { InputGrid } from './Form.styles';

const SignupForm = ({ onClickNavigateGoBack, onSubmit }: ISignupForm) => {
  const {
    ID_REQUIRED,
    PASSWORD_REQUIRED,
    PASSWORD_CONFIRM_REQUIRED,
    EMAIL_REQUIRED,
    PHONENUMBER_REQUIRED,
    WORKER_PHONENUMBER_REQUIRED,
  } = REQUIRED;

  const {
    INVALID_EMAIL,
    INVALID_PASSWORD_CONFIRM,
    INVALID_PHONENUMBER,
    INVALID_NORMAL_NUMBER,

    INVALID_NOT_SAME_ID_PASSWORD,
    INVALID_MIN_MAX_PASSWORD,
    INVALID_MIX_PASSWORD,

    INVALID_MIN_MAX_ID,
    INVALID_MIX_ID,
  } = VALIDATION_ERRORS;

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<ISignupInputValues>({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      email: '',
      phonenumber: '',
      worker_phonenumber: '',
    },
  });

  const idErrorMessages: undefined | ValidateResult[] =
    errors.id?.types && Object.values(errors.id?.types);

  const passwordErrorMessages: undefined | ValidateResult[] =
    errors.password?.types && Object.values(errors.password?.types);

  const { field: idField } = useController({
    control,
    name: 'id',
    rules: {
      required: {
        value: true,
        message: ID_REQUIRED,
      },
      pattern: {
        value: REGEXP.ID,
        message: INVALID_MIX_ID,
      },
      minLength: {
        value: 6,
        message: INVALID_MIN_MAX_ID,
      },
      maxLength: {
        value: 15,
        message: INVALID_MIN_MAX_ID,
      },
    },
  });

  const { field: passwordField } = useController({
    control,
    name: 'password',
    rules: {
      required: {
        value: true,
        message: PASSWORD_REQUIRED,
      },
      pattern: {
        value: REGEXP.PASSWORD_SPECIAL_MIX,
        message: INVALID_MIX_PASSWORD,
      },
      validate: (password) => {
        const { id } = getValues();
        return id !== password || INVALID_NOT_SAME_ID_PASSWORD;
      },
      minLength: {
        value: 8,
        message: INVALID_MIN_MAX_PASSWORD,
      },
      maxLength: {
        value: 32,
        message: INVALID_MIN_MAX_PASSWORD,
      },
    },
  });

  const { field: passwordConfirmField } = useController({
    control,
    name: 'passwordConfirm',
    rules: {
      required: {
        value: true,
        message: PASSWORD_CONFIRM_REQUIRED,
      },
      validate: (passwordConfirm) => {
        const { password } = getValues();
        return password === passwordConfirm || INVALID_PASSWORD_CONFIRM;
      },
    },
  });

  const { field: emailField } = useController({
    control,
    name: 'email',
    rules: {
      required: {
        value: true,
        message: EMAIL_REQUIRED,
      },
      pattern: {
        value: REGEXP.EMAIL,
        message: INVALID_EMAIL,
      },
    },
  });

  const { field: phonenumberField } = useController({
    control,
    name: 'phonenumber',
    rules: {
      required: {
        value: true,
        message: PHONENUMBER_REQUIRED,
      },
    },
  });

  const { field: workerPhonenumberField } = useController({
    control,
    name: 'worker_phonenumber',
    rules: {
      required: {
        value: true,
        message: WORKER_PHONENUMBER_REQUIRED,
      },
    },
  });

  const handleId = async (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value.trim();
    idField.onChange(id);

    const { password } = getValues();
    if (!password) return;
    const result = await trigger('password');
  };

  const handlePassword = async (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value.trim();
    passwordField.onChange(password);

    const { passwordConfirm } = getValues();
    if (!passwordConfirm) return;
    const result = await trigger('passwordConfirm');
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const phonenumber = e.target.value.replace(/-/g, '');
    phonenumberField.onChange(phonenumber);

    let result = '';
    let threePartNum = REGEXP.THREEPART_NUMBER; // 하이픈 2개

    // 서울 지역번호일 경우에만 하이픈으로 구분할 앞자리는 2개
    if (phonenumber.indexOf('02') === 0) {
      threePartNum = REGEXP.SEOUL_THREEPART_NUMBER;
    }

    if (threePartNum.test(phonenumber)) {
      result = phonenumber.replace(threePartNum, '$1-$2-$3');
    }

    phonenumberField.onChange(result);
  };

  const onBlurPhonenumber = (e: ChangeEvent<HTMLInputElement>) => {
    const phonenumber = e.target.value;
    const regex = REGEXP.NORMAL_NUMBER.test(phonenumber);

    if (!regex) {
      setError('phonenumber', {
        type: 'validate',
        message: INVALID_NORMAL_NUMBER,
      });
    } else {
      clearErrors('phonenumber');
    }
  };

  const handleWorkerPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const workphonenumber = e.target.value.replace(/-/g, '');
    workerPhonenumberField.onChange(workphonenumber);

    if (workphonenumber.length >= 10) {
      const phoneFormat = workphonenumber.replace(
        /(\d{3})(\d{3,4})(\d{4})/,
        '$1-$2-$3'
      );
      workerPhonenumberField.onChange(phoneFormat);
    }
  };

  const onBlurWorkerPhonenumber = (e: ChangeEvent<HTMLInputElement>) => {
    const workerPhonenumber = e.target.value;
    const regex = REGEXP.PHONENUMBER.test(workerPhonenumber);

    if (!regex) {
      setError('worker_phonenumber', {
        type: 'validate',
        message: INVALID_PHONENUMBER,
      });
    } else {
      clearErrors('worker_phonenumber');
    }
  };

  const handleTrim = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<ISignupInputValues, any>
  ) => {
    const value = e.target.value.trim();
    field.onChange(value);
  };

  const onSubmits: SubmitHandler<ISignupInputValues> = (data) => {
    console.log(data);
    const { id, password, email, phonenumber, worker_phonenumber } = data;

    onSubmit({
      id,
      password,
      email,
      phonenumber,
      worker_phonenumber,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmits)}>
      <Grid.Container justify="center" alignItems="center">
        <InputGrid xs={12}>
          <Col>
            <Row>
              <NextUIInput
                {...idField}
                onChange={handleId}
                label="아이디"
                placeholder={PLACEHOLDER.ID_PLACEHOLDER}
                color="primary"
                fullWidth
                helperColor="error"
                helperText={
                  errors.id && errors.id.type === 'required' ? ID_REQUIRED : ''
                }
              />
              <div className="button-wrapper">
                <Button css={{ minWidth: 12 }}>중복확인</Button>
              </div>
            </Row>
            <InputMessagesHelper
              validMessages={ID_VALID_MESSAGE}
              errorMessages={idErrorMessages}
              dirtyFields={dirtyFields.id}
            />
          </Col>
        </InputGrid>
        <InputGrid xs={12}>
          <Col>
            <NextUIInputPassword
              {...passwordField}
              onChange={handlePassword}
              type="password"
              label="비밀번호"
              placeholder={PLACEHOLDER.PASSWORD_PLACEHOLDER}
              color="primary"
              fullWidth
              helperColor="error"
              helperText={
                errors.password && errors.password.type === 'required'
                  ? PASSWORD_REQUIRED
                  : ''
              }
            />
            <InputMessagesHelper
              validMessages={PASSWORD_VALID_MESSAGE}
              errorMessages={passwordErrorMessages}
              dirtyFields={dirtyFields.password}
            />
          </Col>
        </InputGrid>
        <InputGrid xs={12}>
          <Col>
            <NextUIInputPassword
              {...passwordConfirmField}
              type="password"
              label="비밀번호 확인"
              placeholder={PLACEHOLDER.PASSWORD_CONFIRM_PLACEHOLDER}
              color="primary"
              fullWidth
              helperColor="error"
              helperText={
                errors.passwordConfirm && errors.passwordConfirm.message
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTrim(e, passwordConfirmField)
              }
            />
          </Col>
        </InputGrid>
        <InputGrid xs={12}>
          <NextUIInput
            {...emailField}
            type="email"
            label="이메일"
            placeholder={PLACEHOLDER.EMAIL_PLACEHOLDER}
            color="primary"
            fullWidth
            helperColor="error"
            helperText={errors.email?.message && errors.email.message}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTrim(e, emailField)
            }
          />
        </InputGrid>

        <InputGrid xs={12}>
          <NextUIInput
            {...phonenumberField}
            label="전화번호"
            placeholder={PLACEHOLDER.PHONENUMBER_PLACEHOLDER}
            color="primary"
            fullWidth
            helperColor="error"
            helperText={
              errors.phonenumber?.message && errors.phonenumber?.message
            }
            onChange={handlePhone}
            onBlur={onBlurPhonenumber}
          />
        </InputGrid>
        <InputGrid xs={12}>
          <NextUIInput
            {...workerPhonenumberField}
            onChange={handleWorkerPhone}
            onBlur={onBlurWorkerPhonenumber}
            label="휴대폰 번호"
            placeholder={PLACEHOLDER.WORER_PHONENUMBER_PLACEHOLDER}
            color="primary"
            fullWidth
            helperColor="error"
            helperText={
              errors.worker_phonenumber?.message &&
              errors.worker_phonenumber?.message
            }
          />
        </InputGrid>
        <Grid.Container css={{ mt: 16 }}>
          <InputGrid
            justify="flex-start"
            xs={6}
            md={6}
            css={{ paddingRight: 6 }}
          >
            <Button
              css={{
                width: '100%',
                '@xs': {
                  width: '100%',
                },
              }}
              onClick={onClickNavigateGoBack}
              ghost
            >
              이전
            </Button>
          </InputGrid>
          <InputGrid justify="flex-end" xs={6} md={6}>
            <Button
              disabled={isSubmitting || !isValid}
              type="submit"
              css={{
                width: '100%',
                '@xs': {
                  width: '100%',
                },
              }}
            >
              완료
            </Button>
          </InputGrid>
        </Grid.Container>
      </Grid.Container>
    </form>
  );
};

export default SignupForm;
