export interface ISignupParams {
  id: string;
  password: string;
  email: string;
  phonenumber: string;
  worker_phonenumber: string;
}

export interface ISignupForm {
  onClickNavigateGoBack: () => void;
  onSubmit: ({
    id,
    password,
    email,
    phonenumber,
    worker_phonenumber,
  }: ISignupParams) => void;
}

export interface ISignupInputValues {
  id: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phonenumber: string;
  worker_phonenumber: string;
}
