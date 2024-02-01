import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { PAGES, TOKEN_KEY } from "../constants";
import { useLoginQuery, LoginData } from "../model";
import { Card, Input, PasswordInput, FormField, Error } from "../components"
import Loader  from "../icons/loader.svg?react";

const ContainedCard = styled(Card)`
    max-width: 600px;
`;

const ButtonContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const LoaderWithMargin = styled(Loader)`
    margin-left: 0.5rem;
    margin-right: -8px;
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
`
const UNAUTHORIZED = "Unauthorized";

export const Login =  () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<LoginData>();
    const { mutate, error, isPending, isError } = useLoginQuery({
        onSuccess: ({ data: { token }}) => {
            localStorage.setItem(TOKEN_KEY, token);
            navigate(PAGES.SERVERS); 
        }
    });

    const errorMessage = useMemo(() => {
        if (!isError) return null;

        const errorMessage = error?.response?.data?.message ?? error?.message;

        if (errorMessage === UNAUTHORIZED) return t("form.errors.login");
        if (errorMessage) return errorMessage;

        return t("form.errors.unknown");
    }, [error, isError, t]);

    const onSubmit = handleSubmit((data) => mutate(data));

    return (
        <>
            <h1>{t("login.title")}</h1>
            <ContainedCard>
                <h2>{t("form.title")}</h2>
                <form onSubmit={onSubmit}>
                    <FormField error={formErrors?.username?.message}>
                        <Input
                            {...register("username", { required: t("form.errors.username") })}
                            placeholder={t("form.username")}
                            $isError={Boolean(formErrors?.username)}
                        />
                    </FormField>
                    <FormField error={formErrors?.password?.message}>
                        <PasswordInput
                            {...register("password", { required: t("form.errors.password") })}
                            placeholder={t("form.password")}
                            $isError={Boolean(formErrors?.password)}
                        />
                    </FormField>
                    {errorMessage ? <Error>{errorMessage}</Error> : null}
                    <ButtonContainer>
                        <Button type="submit">
                            {t("form.submit")}
                            {isPending ? <LoaderWithMargin height={24} width={24} /> : null}
                        </Button>
                    </ButtonContainer>
                </form>
            </ContainedCard>
        </>
    );
}