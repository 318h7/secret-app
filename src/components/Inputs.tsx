import { InputHTMLAttributes } from 'react';
import styled from 'styled-components'

interface CustomInputProps {
  readonly $isError?: boolean;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

export const Input = styled.input<InputProps>`
    border-radius: 3px;
    border: ${({ theme: { colors }, $isError }) => `1px solid ${$isError ? colors.error : colors.main}`};
    display: block;
    margin: 0 0 1em;
    padding: 1rem;
  
    ::placeholder {
      color: ${({theme: { colors }}) => colors.text};
    }
  `

export const PasswordInput = (props: InputProps) => <Input {...props} type="password" />;