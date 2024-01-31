import styled from "styled-components";
import type { InputProps } from "./Inputs";

interface FormFieldProps extends InputProps {
    error?: string;
}

export const Error = styled.div`
    color: ${({ theme: { colors } }) => colors.error};
    font-size: 0.8rem;
    min-height: 1.5rem;
`

export const FormField = ({ error, children }: FormFieldProps) => (
    <>
        {children}
        <Error>{error}</Error>
    </>
)
FormField.displayName = 'FormField';