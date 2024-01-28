import { useTranslation } from "react-i18next";
import { Card, Form, Button, Input, PasswordInput } from "../components"
import { object, string } from 'yup';
import { ChangeEvent, useState } from "react";
import type { FormErrors } from "../components";


interface FormFields {
    username: string;
    password: string;
}

export const Login =  () => {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<FormErrors<FormFields>>(undefined);

    const handleSubmit = (data: FormFields, isValid: boolean, formErrors: FormErrors<FormFields>) => {
        if (formErrors) {
            setErrors(formErrors);
        }
        console.log(data, isValid);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name as keyof FormFields;

        if (errors !== undefined && errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }
    }

    const loginSchema = object({
        username: string()
            .required(t("form.errors.username_required")),
        password: string()
            .required(t("form.errors.password_required"))
    });

    return (
        <Card>
            <Form<FormFields> onSubmit={handleSubmit} schema={loginSchema}>
                <Input
                    name="username"
                    onChange={handleChange}
                    placeholder={t("form.username")}
                    $isError={Boolean(errors?.username)}
                />
                <PasswordInput
                    name="password"
                    onChange={handleChange}
                    placeholder={t("form.password")}
                    $isError={Boolean(errors?.password)}
                />
                <Button type="submit">{t("form.submit")}</Button>
            </Form>
        </Card> 
    );
}