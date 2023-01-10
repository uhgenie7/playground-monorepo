import { StyledHelperText } from './InputMessagesHelper.styles';
import { ValidateResult } from 'react-hook-form';

interface IInputMessagesHelper {
  validMessages: string[];
  errorMessages?: ValidateResult[];
  dirtyFields?: boolean;
}

interface IInputMessageHelper {
  errorStatus?: boolean;
  message: string;
  isDirtyFields?: boolean;
}

/**
 * @param validMessages: 유효성 체크에 통과해야 하는 메시지.
 * @param errorMessages: 유효성 체크에 통과하지 못한 에러 메시지.
 * @description: 유효성 에러 메시지(복수) 컴포넌트. HelperText를 그려냅니다.
 */

const InputMessagesHelper = ({
  validMessages,
  errorMessages,
  dirtyFields,
}: IInputMessagesHelper) => {
  return (
    <>
      {validMessages.map((validMessage) => {
        return (
          <InputMessageHelper
            key={validMessage}
            errorStatus={errorMessages?.includes(validMessage)}
            isDirtyFields={dirtyFields}
            message={validMessage}
          />
        );
      })}
    </>
  );
};

/**
 * @param errorStatus: 유효성 체크에 실패한 문장은 붉게 표시됩니다.
 * @param message: 에러 메시지
 * @description: 유효성 에러 메시지 컴포넌트(단수). HelperText 단일입니다.
 */
export const InputMessageHelper = ({
  isDirtyFields,
  errorStatus,
  message,
}: IInputMessageHelper) => {
  return (
    <StyledHelperText
      key={message}
      color={
        isDirtyFields === undefined
          ? 'secondary'
          : errorStatus
          ? 'error'
          : 'primary'
      }
    >
      {message}
    </StyledHelperText>
  );
};

export default InputMessagesHelper;
