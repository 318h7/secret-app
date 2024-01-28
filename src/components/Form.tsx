import { FormEvent, ReactNode } from "react";
import { AnyObject, Maybe, ObjectSchema } from "yup";

export type FormErrors<T> = Partial<T> | undefined;
interface Props<FormValues extends Maybe<AnyObject>> {
    children?: ReactNode;
    onSubmit: (data: FormValues, isValid: boolean, error?: FormErrors<FormValues>) => void;
    schema?: ObjectSchema<FormValues>;
}

const elementsToValues = <T extends object>(object: T, element: Element) => {
    const input = element as HTMLInputElement;
    
    if (input.type === "submit") return object;

    return { ...object, [input.name]: input.value };
};

export const Form = <T extends object>({ children, schema, onSubmit }: Props<T>) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const values = Array.from(form.elements).reduce<T>(elementsToValues, {} as T);

        if (schema) {
            let errorMessage = undefined;

            const result = await schema.validate(values).catch((error) => {
                errorMessage = { [error.path]: error.message };
            });

            onSubmit(result as T ?? values, !errorMessage, errorMessage);
        } else {
            onSubmit(values, true);
        }
    }
  
    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
  }