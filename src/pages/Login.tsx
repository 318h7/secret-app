import { useTranslation } from "react-i18next";
import { Card, Button, Input, PasswordInput, FormField, Error } from "../components"
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postData } from "../rest";
import { redirect } from "react-router-dom";
import { PAGES, TOKEN_KEY } from "../constants";
import { useState } from "react";

interface FormFields {
    username: string;
    password: string;
}

const ContainedCard = styled(Card)`
    max-width: 600px; 
`;

const UNAUTHORIZED = "Unauthorized";

type Response = { message: string } | { token: string };

export const Login =  () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
    const [error, setError] = useState<string | null>(null);
    const onSubmit = handleSubmit(async (data: FormFields) => {
        setError(null);
        const response = await postData<Response, FormFields>("/tokens", data);
        
        if ('token' in response) {
            localStorage.setItem(TOKEN_KEY, response.token);
            redirect(PAGES.SERVERS);
        } else if ('message' in response) {
            switch (response.message) {
                case UNAUTHORIZED:
                    setError(t("form.errors.login"));
                    break;
                default:
                    setError(t("form.errors.unknown"));
            }
        }
    });

    return (
        <>
            <h1>{t("login.title")}</h1>
            <ContainedCard>
                <h2>{t("form.title")}</h2>
                <form onSubmit={onSubmit}>
                    <FormField error={errors?.username?.message}>
                        <Input
                            {...register("username", { required: t("form.errors.username") })}
                            placeholder={t("form.username")}
                            $isError={Boolean(errors?.username)}
                        />
                    </FormField>
                    <FormField error={errors?.password?.message}>
                        <PasswordInput
                            {...register("password", { required: t("form.errors.password") })}
                            placeholder={t("form.password")}
                            $isError={Boolean(errors?.password)}
                        />
                    </FormField>
                    {error ? <Error>{error}</Error> : null}
                    <div>
                        <Button type="submit">{t("form.submit")}</Button>
                    </div>
                </form>
            </ContainedCard>
        </>
    );
}