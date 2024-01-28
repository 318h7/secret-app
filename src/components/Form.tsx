import { FormEvent, ReactNode } from "react";
import { AnyObject, Maybe, ObjectSchema } from "yup";

interface Props<FormValues extends Maybe<AnyObject>> {
    children?: ReactNode;
    onSubmit: (data: FormValues, isValid: boolean, error?: string) => void;
    validate?: ObjectSchema<FormValues>;
}

export const Form = <T extends object>({ children, validate, onSubmit }: Props<T>) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const values = Array.from(form.elements).reduce<T>((object, element) => {
            const input = element as HTMLInputElement;
            
            if (input.type === "submit") return object;

            return { ...object, [input.name]: input.value };
        }, {} as T);

        if (validate) {
            let errorMessage = undefined;

            const result = await validate.validate(values).catch((error) => {
                errorMessage = error.message;
            });

            onSubmit(result as T ?? values, !errorMessage, errorMessage);
        }
        
    }
  
    return (
    <form onSubmit={handleSubmit}>
        {children}
    </form>
    );
  }