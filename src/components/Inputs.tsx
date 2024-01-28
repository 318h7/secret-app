import { InputHTMLAttributes } from 'react';
import styled from 'styled-components'

export const Input = styled.input`
    border-radius: 3px;
    border: ${({ theme }) => `1px solid ${theme.main}`};
    display: block;
    margin: 0 0 1em;
    padding: 1rem;
  
    ::placeholder {
      color: ${({theme}) => theme.text};
    }
  `

export const PasswordInput = (props: InputHTMLAttributes<HTMLInputElement>) => <Input {...props} type="password" />;