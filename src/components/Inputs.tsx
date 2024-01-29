import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import styled from 'styled-components'

interface CustomInputProps {
  readonly $isError?: boolean;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

const Error = styled.div`
    color: ${({ theme: { colors } }) => colors.error};
    font-size: 0.8rem;
    min-height: 1.5rem;
`

export const Input = styled.input<InputProps>`
  border: ${({ theme: { colors }, $isError }) => `1px solid ${$isError ? colors.error : colors.main}`};
`;

export const PasswordInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => <Input {...props} ref={ref} type="password" />);
PasswordInput.displayName = 'PasswordInput';

interface FormFieldProps extends InputProps {
  error?: string;
}
export const FormField = 
  ({ error, children }: FormFieldProps) => (
  <>
    {children}
    <Error>{error}</Error>
  </>
  )

FormField.displayName = 'FormField';