import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import styled from 'styled-components'

interface CustomInputProps {
  readonly $isError?: boolean;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

export const Input = styled.input<InputProps>`
  border: ${({ theme: { colors }, $isError }) => `1px solid ${$isError ? colors.error : colors.main}`};
`;

export const PasswordInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => <Input {...props} ref={ref} type="password" />);
PasswordInput.displayName = 'PasswordInput';

