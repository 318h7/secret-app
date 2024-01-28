import { Card, Form, Button, Input, PasswordInput } from "../components"
import { object, string } from 'yup';

const loginSchema = object({
  username: string().required(),
  password: string().required().min(8, 'Password is too short - should be 8 chars minimum.')
  ,
});

interface FormFields {
    username: string;
    password: string;
}

export const Login =  () => {
    const handleSubmit = (data: FormFields, isValid: boolean, error?: string) => {
        console.log(data, isValid, error);
    };

    return (
        <Card>
            <Form<FormFields> onSubmit={handleSubmit} validate={loginSchema}>
                <Input name="username" placeholder="username" />
                <PasswordInput name="password" placeholder="password" />
                <Button type="submit">Login</Button>
            </Form>
        </Card> 
    );
}