export const VALIDATION_ERRORS = {
  INVALID_MIN_MAX_ID: '6자리 이상 15자리 이하',
  INVALID_MIX_ID: '영문(소문자) 혹은 영문과 숫자를 조합',

  INVALID_NOT_SAME_ID_PASSWORD: '아이디와 동일한 비밀번호 사용불가',
  INVALID_MIN_MAX_PASSWORD: '8자리 이상 32자리 이하',
  INVALID_MIX_PASSWORD: '영문, 숫자, 특수문자(공백 제외) 중 2개 이상 조합',

  INVALID_PASSWORD_CONFIRM: '동일한 비밀번호를 입력해주세요',
  INVALID_EMAIL: '올바른 이메일을 입력해주세요',
  INVALID_PHONENUMBER: '올바른 휴대폰 번호를 입력해주세요',
  INVALID_NORMAL_NUMBER: '올바른 전화번호를 입력해주세요',
};

export const REQUIRED = {
  ID_REQUIRED: '아이디를 입력해주세요',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요',
  PASSWORD_CONFIRM_REQUIRED: '비밀번호를 다시 입력해주세요',
  EMAIL_REQUIRED: '이메일을 입력해주세요',
  PHONENUMBER_REQUIRED: '전화번호를 입력해주세요',
  WORKER_PHONENUMBER_REQUIRED: '휴대폰 번호를 입력해주세요',
};

export const PLACEHOLDER = {
  ID_PLACEHOLDER: '영문 소문자 또는 영문, 숫자 조합 6~15자리',
  PASSWORD_PLACEHOLDER:
    '영문, 숫자, 특수문자(공백 제외) 중 2개 이상 조합 8~32자리',
  PASSWORD_CONFIRM_PLACEHOLDER: `${REQUIRED.PASSWORD_CONFIRM_REQUIRED}`,
  EMAIL_PLACEHOLDER: '@ 이하 주소까지 모두 입력해주세요',
  PHONENUMBER_PLACEHOLDER: `${REQUIRED.PHONENUMBER_REQUIRED}`,
  WORER_PHONENUMBER_PLACEHOLDER: `${REQUIRED.WORKER_PHONENUMBER_REQUIRED}`,
};

export const ID_VALID_MESSAGE: string[] = [
  VALIDATION_ERRORS.INVALID_MIN_MAX_ID,
  VALIDATION_ERRORS.INVALID_MIX_ID,
];

export const PASSWORD_VALID_MESSAGE: string[] = [
  VALIDATION_ERRORS.INVALID_NOT_SAME_ID_PASSWORD,
  VALIDATION_ERRORS.INVALID_MIN_MAX_PASSWORD,
  VALIDATION_ERRORS.INVALID_MIX_PASSWORD,
];
