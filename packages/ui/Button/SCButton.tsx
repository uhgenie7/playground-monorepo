import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export const SCButton = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props}></StyledButton>;
};

const StyledButton = styled.button`
  color: blue;
  background: skyblue;
`;
