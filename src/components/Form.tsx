import { FormEvent, ReactNode } from "react";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

export type FormErrors<T> = Partial<Record<keyof T, string>> | undefined;

interface Props<FormValues extends Maybe<AnyObject>> {
    children?: ReactNode;
    onSubmit: (data: FormValues, isValid: boolean, error?: FormErrors<FormValues>) => void;
    schema?: ObjectSchema<FormValues>;
}

const elementsToValues = <T  extends Maybe<AnyObject>>(object: T, element: Element) => {
    const input = element as HTMLInputElement;
    
    if (input.type === "submit") return object;

    return { ...object, [input.name]: input.value };
};

export const Form = <T  extends Maybe<AnyObject>>({ children, schema, onSubmit }: Props<T>) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const values = Array.from(form.elements).reduce<T>(elementsToValues, {} as T);

        if (schema) {
            let errorMessages: FormErrors<T> = undefined;

            const result = await schema.validate(values, { abortEarly: false }).catch((error: ValidationError) => {
                errorMessages = {};

                error.inner.forEach(({ path, message }) => {
                    if (errorMessages !== undefined && path !== undefined) {
                        const key: keyof T = path as keyof T;
                        errorMessages[key] = message;
                    }
                })
            });

            onSubmit(result as T ?? values, !errorMessages, errorMessages);
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