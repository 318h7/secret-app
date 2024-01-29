import { useTranslation } from "react-i18next";
import { Card, Button, Input, PasswordInput } from "../components"
import { useForm } from "react-hook-form";
import styled from "styled-components";


interface FormFields {
    username: string;
    password: string;
}

const Error = styled.div`
    color: ${({ theme: { colors } }) => colors.error};
    font-size: 0.8rem;
    min-height: 1.5rem;
    margin-bottom: 0.5rem;
`

export const Login =  () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    const onSubmit = (data: FormFields) => {
        console.log(data);
    };

    return (
        <Card>
            <h2>{t("form.title")}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("username", { required: t("form.errors.username") })}
                    placeholder={t("form.username")}
                    $isError={Boolean(errors?.username)}
                />
                <Error>{errors?.username?.message}</Error>
                <PasswordInput
                    {...register("password", { required: t("form.errors.password") })}
                    placeholder={t("form.password")}
                    $isError={Boolean(errors?.password)}
                />
                <Error>{errors?.password?.message}</Error>
                <div>
                    <Button type="submit">{t("form.submit")}</Button>
                </div>
            </form>
        </Card> 
    );
}