import { InputHTMLAttributes, Ref, forwardRef, useState } from 'react';
import styled from 'styled-components'
import EyeOn  from "../icons/eye-on.svg?react";
import EyeOff  from "../icons/eye-off.svg?react";
import { useTranslation } from 'react-i18next';

interface CustomInputProps {
  readonly $isError?: boolean;
}

const EyeOnIcon = styled(EyeOn)`
  cursor: pointer;
  position: absolute;
  justify-self: end;
  margin-right: 0.5rem;
`;

const EyeOffIcon = styled(EyeOff)`
  cursor: pointer;
  position: absolute;
  justify-self: end;
  margin-right: 0.5rem;

`;

const RelativeBox = styled.div`
  position: relative;
  display: grid;
  width: fit-content;
  align-items: center;
`;

export type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

export const Input = styled.input<InputProps>`
  border: ${({ theme: { colors }, $isError }) => `1px solid ${$isError ? colors.error : colors.main}`};
`;

export const PasswordInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? 'text' : 'password';
  const Icon = showPassword ?  EyeOnIcon : EyeOffIcon;
  const label = showPassword ? t('form.hide-password') : t('form.show-password');

  return (
    <RelativeBox>
      <Input {...props} ref={ref} type={type} />
      <Icon aria-label={label} width={16} onClick={() => setShowPassword(!showPassword)} />
    </RelativeBox>

  );
});
PasswordInput.displayName = 'PasswordInput';

