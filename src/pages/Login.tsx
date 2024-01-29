import { useTranslation } from "react-i18next";
import { Card, Button, Input, PasswordInput, FormField, Error } from "../components"
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PAGES, TOKEN_KEY } from "../constants";
import { useState } from "react";
import { useLoginQuery } from "../model";

interface FormFields {
    username: string;
    password: string;
}

const ContainedCard = styled(Card)`
    max-width: 600px; 
`;

const ButtonContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
    allign-items: center;
`;

const UNAUTHORIZED = "Unauthorized";

export const Login =  () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
    const [err, setError] = useState<string | null>(null);
    // TODO: use isPending to show a loading indicator
    const { mutate, error  } = useLoginQuery({
        onSuccess: ({ data: { token }}) => {
            localStorage.setItem(TOKEN_KEY, token);
            navigate(PAGES.SERVERS); 
        },
        onError: (error) => {
            switch (error?.response?.data.message) {
                case UNAUTHORIZED:
                    setError(t("form.errors.login"));
                    break;
                default:
                    setError(t("form.errors.unknown"));
            }
        }
    });

    // TODO: Get rig of custom error state
    //console.log(error);

    const onSubmit = handleSubmit((data) => mutate(data));

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
                    {error ? <Error>{err}</Error> : null}
                    <ButtonContainer>
                        <Button type="submit">{t("form.submit")}</Button>
                    </ButtonContainer>
                </form>
            </ContainedCard>
        </>
    );
}