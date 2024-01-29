import { useTranslation } from "react-i18next";
import { Card, Button, Input, PasswordInput, FormField } from "../components"
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface FormFields {
    username: string;
    password: string;
}

const ContainedCard = styled(Card)`
    max-width: 600px; 
;
`;

export const Login =  () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    const onSubmit = handleSubmit((data: FormFields) => {
        console.log(data);
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
                    <div>
                        <Button type="submit">{t("form.submit")}</Button>
                    </div>
                </form>
            </ContainedCard>
        </>
    );
}