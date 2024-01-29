import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import styled from 'styled-components'

interface CustomInputProps {
  readonly $isError?: boolean;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

export const Input = styled.input<InputProps>`
    border-radius: 8px;
    border: ${({ theme: { colors }, $isError }) => `1px solid ${$isError ? colors.error : colors.main}`};
    display: block;
    margin: 0 0 0.5rem;
    padding: 1rem;
  
    ::placeholder {
      color: ${({theme: { colors }}) => colors.text};
    }

    &:focus {
      outline: none;
    }
  `

export const PasswordInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => <Input {...props} ref={ref} type="password" />);